import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class StudentsService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getStudentProfile(
        studentId: string,
        institutionId: string,
    ) {
        const student =
            await this.prisma.user.findFirst({
                where: {
                    id: studentId,
                    institutionId,
                    role: 'STUDENT',
                    isActive: true,
                },
                include: {
                    department: true,
                    studentProfile: true,
                },
            });

        if (!student) {
            throw new NotFoundException(
                'Student not found in this institution.',
            );
        }

        return {
            id: student.id,
            name: student.name,
            email: student.email,

            department: student.department
                ? {
                    id: student.department.id,
                    name: student.department.name,
                    code: student.department.code,
                }
                : null,

            profile: student.studentProfile
                ? {
                    enrollmentNumber:
                        student.studentProfile.enrollmentNumber,

                    program:
                        student.studentProfile.program,

                    semester:
                        student.studentProfile.semester,

                    cgpa:
                        student.studentProfile.cgpa
                            ? Number(student.studentProfile.cgpa)
                            : null,

                    attendancePercentage:
                        student.studentProfile.attendancePercentage
                            ? Number(
                                student.studentProfile
                                    .attendancePercentage,
                            )
                            : null,
                }
                : null,
        };
    }

    async getMyStudentProfile(
        userId: string,
        institutionId: string,
    ) {
        const student =
            await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    institutionId,
                    role: 'STUDENT',
                    isActive: true,
                },
                include: {
                    department: true,
                    studentProfile: true,
                },
            });

        if (!student) {
            throw new ForbiddenException(
                'Student profile not found.',
            );
        }

        return {
            id: student.id,
            name: student.name,
            email: student.email,

            department: student.department
                ? {
                    id: student.department.id,
                    name: student.department.name,
                    code: student.department.code,
                }
                : null,

            profile: student.studentProfile
                ? {
                    enrollmentNumber:
                        student.studentProfile.enrollmentNumber,

                    program:
                        student.studentProfile.program,

                    semester:
                        student.studentProfile.semester,

                    cgpa:
                        student.studentProfile.cgpa
                            ? Number(student.studentProfile.cgpa)
                            : null,

                    attendancePercentage:
                        student.studentProfile.attendancePercentage
                            ? Number(
                                student.studentProfile
                                    .attendancePercentage,
                            )
                            : null,
                }
                : null,
        };
    }

    /*
     * Builds a smaller, trusted context specifically for AI reasoning.
     *
     * This data comes directly from our database, not from the client.
     */
    async getStudentContext(
        userId: string,
        institutionId: string,
    ): Promise<Record<string, unknown>> {
        const student =
            await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    institutionId,
                    role: 'STUDENT',
                    isActive: true,
                },
                include: {
                    department: true,
                    studentProfile: true,
                },
            });

        if (!student) {
            throw new ForbiddenException(
                'Student context could not be resolved.',
            );
        }

        return {
            student_id: student.id,

            department: student.department
                ? {
                    name: student.department.name,
                    code: student.department.code,
                }
                : null,

            enrollment_number:
                student.studentProfile?.enrollmentNumber ?? null,

            program:
                student.studentProfile?.program ?? null,

            semester:
                student.studentProfile?.semester ?? null,

            cgpa:
                student.studentProfile?.cgpa
                    ? Number(student.studentProfile.cgpa)
                    : null,

            attendance_percentage:
                student.studentProfile?.attendancePercentage
                    ? Number(
                        student.studentProfile
                            .attendancePercentage,
                    )
                    : null,
        };
    }
}