import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  MOCK_STUDENT_ADMIT_CARDS,
  MOCK_STUDENT_ATTENDANCE,
  MOCK_STUDENT_RESULTS,
  StudentAdmitCardData,
  StudentAttendanceData,
  StudentResultData,
  SubjectAttendanceData,
} from './mock-erp.data';

@Injectable()
export class MockErpService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Helper to resolve enrollment code or user ID to mock ERP key (e.g. NIYAM2026001).
   */
  async resolveStudentKey(
    studentIdOrEnrollment: string,
    institutionId?: string,
  ): Promise<string> {
    const directKey = studentIdOrEnrollment.trim().toUpperCase();

    if (MOCK_STUDENT_RESULTS[directKey]) {
      return directKey;
    }

    // Try finding in database by user id or enrollmentNumber
    const student = await this.prisma.user.findFirst({
      where: {
        OR: [
          { id: studentIdOrEnrollment },
          { studentProfile: { enrollmentNumber: directKey } },
        ],
        ...(institutionId ? { institutionId } : {}),
      },
      include: { studentProfile: true },
    });

    if (
      student?.studentProfile?.enrollmentNumber &&
      (MOCK_STUDENT_RESULTS[student.studentProfile.enrollmentNumber] ||
       MOCK_STUDENT_RESULTS[student.studentProfile.enrollmentNumber.replace(/_/g, '')])
    ) {
      return MOCK_STUDENT_RESULTS[student.studentProfile.enrollmentNumber]
        ? student.studentProfile.enrollmentNumber
        : student.studentProfile.enrollmentNumber.replace(/_/g, '');
    }

    // Map default student IDs to keys
    const mapping: Record<string, string> = {
      student_001: 'NIYAM2026001',
      NIYAM2026_001: 'NIYAM2026001',
      NIYAM2026001: 'NIYAM2026001',
      student_002: 'NIYAM2026002',
      student_003: 'NIYAM2026003',
      student_004: 'NIYAM2026004',
      student_005: 'NIYAM2026005',
    };

    if (mapping[studentIdOrEnrollment]) {
      return mapping[studentIdOrEnrollment];
    }

    // Fallback to primary student NIYAM2026001 if valid user found
    if (student) {
      return 'NIYAM2026001';
    }

    throw new NotFoundException(
      `No academic ERP records found for student: ${studentIdOrEnrollment}`,
    );
  }

  private async findStudentUser(
    studentIdOrEnrollment: string,
    key: string,
    institutionId?: string,
  ) {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { id: studentIdOrEnrollment },
          { id: key },
          { studentProfile: { enrollmentNumber: key } },
        ],
        ...(institutionId ? { institutionId } : {}),
      },
      include: { studentProfile: true },
    });
  }

  async getStudentResult(
    studentIdOrEnrollment: string,
    institutionId?: string,
  ): Promise<StudentResultData> {
    const key = await this.resolveStudentKey(
      studentIdOrEnrollment,
      institutionId,
    );
    const data = MOCK_STUDENT_RESULTS[key];

    if (!data) {
      throw new NotFoundException(
        `Student result not found for ${studentIdOrEnrollment}`,
      );
    }

    const student = await this.findStudentUser(
      studentIdOrEnrollment,
      key,
      institutionId,
    );

    return {
      ...data,
      studentName: student?.name || data.studentName,
      studentId: student?.id || data.studentId,
    };
  }

  async getAdmitCard(
    studentIdOrEnrollment: string,
    institutionId?: string,
  ): Promise<StudentAdmitCardData> {
    const key = await this.resolveStudentKey(
      studentIdOrEnrollment,
      institutionId,
    );
    const data = MOCK_STUDENT_ADMIT_CARDS[key];

    if (!data) {
      throw new NotFoundException(
        `Admit card not found for ${studentIdOrEnrollment}`,
      );
    }

    const student = await this.findStudentUser(
      studentIdOrEnrollment,
      key,
      institutionId,
    );

    return {
      ...data,
      studentName: student?.name || data.studentName,
      studentId: student?.id || data.studentId,
    };
  }

  async getAttendance(
    studentIdOrEnrollment: string,
    institutionId?: string,
  ): Promise<StudentAttendanceData> {
    const key = await this.resolveStudentKey(
      studentIdOrEnrollment,
      institutionId,
    );
    const raw = MOCK_STUDENT_ATTENDANCE[key];

    if (!raw) {
      throw new NotFoundException(
        `Attendance records not found for ${studentIdOrEnrollment}`,
      );
    }

    // Dynamically calculate percentage and status for each subject
    const subjects: SubjectAttendanceData[] = raw.subjects.map((sub) => {
      const percentage = Number(
        ((sub.classesAttended / sub.classesConducted) * 100).toFixed(2),
      );
      return {
        ...sub,
        attendancePercentage: percentage,
        status: percentage >= 75.0 ? 'ELIGIBLE' : 'SHORT_ATTENDANCE',
      };
    });

    const totalConducted = subjects.reduce(
      (sum, s) => sum + s.classesConducted,
      0,
    );
    const totalAttended = subjects.reduce(
      (sum, s) => sum + s.classesAttended,
      0,
    );
    const overallPercentage = Number(
      ((totalAttended / totalConducted) * 100).toFixed(2),
    );

    const student = await this.findStudentUser(
      studentIdOrEnrollment,
      key,
      institutionId,
    );

    return {
      studentId: student?.id || raw.studentId,
      registrationNo: raw.registrationNo,
      studentName: student?.name || raw.studentName,
      program: raw.program,
      branch: raw.branch,
      semester: raw.semester,
      overallConducted: totalConducted,
      overallAttended: totalAttended,
      overallPercentage: overallPercentage,
      overallStatus:
        overallPercentage >= 75.0 ? 'ELIGIBLE' : 'SHORT_ATTENDANCE',
      subjects,
    };
  }
}
