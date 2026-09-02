import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import { InstitutionalTool } from '../institutional-tools';
import { ToolExecutionContext } from '../tool-execution-context';

@Injectable()
export class StudentInfoTool extends InstitutionalTool {
  readonly name = 'StudentInfoTool';

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async execute(
    operation: string,
    arguments_: Record<string, unknown>,
    context: ToolExecutionContext,
  ): Promise<unknown> {
    switch (operation) {
      case 'getProfile':
        return this.getProfile(arguments_, context);

      default:
        throw new BadRequestException(
          `Unsupported StudentInfoTool operation: ${operation}`,
        );
    }
  }

  private async getProfile(
    arguments_: Record<string, unknown>,
    context: ToolExecutionContext,
  ) {
    /*
     * The AI may propose a studentId, but authorization is
     * enforced here using the trusted execution context.
     */

    const requestedStudentId =
      typeof arguments_.studentId === 'string' &&
      arguments_.studentId.trim().length > 0
        ? arguments_.studentId
        : context.userId;

    /*
     * Students may only access their own information.
     */
    if (context.role === 'STUDENT' && requestedStudentId !== context.userId) {
      throw new ForbiddenException(
        'Students can only access their own profile.',
      );
    }

    /*
     * Only faculty and admins may retrieve another student's profile.
     */
    if (
      context.role !== 'STUDENT' &&
      context.role !== 'FACULTY' &&
      context.role !== 'ADMIN'
    ) {
      throw new ForbiddenException(
        'You are not authorized to access student information.',
      );
    }

    const student = await this.prisma.user.findFirst({
      where: {
        id: requestedStudentId,
        institutionId: context.institutionId,
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
        'Student profile not found in this institution.',
      );
    }

    return {
      studentId: student.id,

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
            enrollmentNumber: student.studentProfile.enrollmentNumber,

            program: student.studentProfile.program,

            semester: student.studentProfile.semester,

            cgpa:
              student.studentProfile.cgpa !== null
                ? Number(student.studentProfile.cgpa)
                : null,

            attendancePercentage:
              student.studentProfile.attendancePercentage !== null
                ? Number(student.studentProfile.attendancePercentage)
                : null,
          }
        : null,
    };
  }
}
