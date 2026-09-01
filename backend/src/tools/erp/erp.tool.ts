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
export class ErpTool extends InstitutionalTool {
    readonly name = 'ERP';

    constructor(private readonly prisma: PrismaService) {
        super();
    }

    async execute(
        operation: string,
        arguments_: Record<string, unknown>,
        context: ToolExecutionContext,
    ): Promise<unknown> {
        switch (operation) {
            case 'GET_SEMESTER_RESULT':
                return this.getSemesterResult(arguments_, context);
            default:
                throw new BadRequestException(
                    `Unsupported ErpTool operation: ${operation}`,
                );
        }
    }

    private async getSemesterResult(
        arguments_: Record<string, unknown>,
        context: ToolExecutionContext,
    ) {
        const { enrollmentNumber, semester } = arguments_;

        if (typeof enrollmentNumber !== 'string' || enrollmentNumber.trim().length === 0) {
            throw new BadRequestException('enrollmentNumber is required and must be a non-empty string.');
        }

        if (typeof semester !== 'number' || !Number.isInteger(semester) || semester <= 0) {
            throw new BadRequestException('semester is required and must be a positive integer.');
        }

        let targetStudentProfileId: string;

        if (context.role === 'STUDENT') {
            const authStudentProfile = await this.prisma.studentProfile.findFirst({
                where: {
                    userId: context.userId,
                    institutionId: context.institutionId,
                },
            });

            if (!authStudentProfile) {
                throw new NotFoundException('Authenticated student profile not found.');
            }

            if (authStudentProfile.enrollmentNumber !== enrollmentNumber) {
                throw new ForbiddenException('You are not authorized to access another student\'s result.');
            }

            targetStudentProfileId = authStudentProfile.id;
        } else if (context.role === 'FACULTY' || context.role === 'ADMIN') {
            const targetStudentProfile = await this.prisma.studentProfile.findFirst({
                where: {
                    enrollmentNumber: enrollmentNumber,
                    institutionId: context.institutionId,
                },
            });

            if (!targetStudentProfile) {
                throw new NotFoundException('Student profile not found in this institution.');
            }

            targetStudentProfileId = targetStudentProfile.id;
        } else {
            throw new ForbiddenException('You are not authorized to perform this operation.');
        }

        const semesterResult = await this.prisma.semesterResult.findFirst({
            where: {
                studentProfileId: targetStudentProfileId,
                semester: semester,
                institutionId: context.institutionId,
            },
            include: {
                studentProfile: {
                    include: {
                        user: true,
                    },
                },
                subjects: {
                    orderBy: {
                        courseCode: 'asc',
                    },
                },
            },
        });

        if (!semesterResult) {
            throw new NotFoundException('Semester result not found.');
        }

        return {
            student: {
                enrollmentNumber: semesterResult.studentProfile.enrollmentNumber,
                name: semesterResult.studentProfile.user.name,
            },
            semester: semesterResult.semester,
            sgpa: semesterResult.sgpa !== null ? Number(semesterResult.sgpa) : null,
            subjects: semesterResult.subjects.map(sub => ({
                courseCode: sub.courseCode,
                courseName: sub.courseName,
                credits: sub.credits,
                marks: sub.marks,
                grade: sub.grade,
            })),
        };
    }
}
