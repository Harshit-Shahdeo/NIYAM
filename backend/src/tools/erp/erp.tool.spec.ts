import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ErpTool } from './erp.tool';
import { PrismaService } from '../../database/prisma.service';
import { ToolExecutionContext } from '../tool-execution-context';

describe('ErpTool', () => {
    let tool: ErpTool;
    let prisma: PrismaService;

    const mockPrismaService = {
        studentProfile: {
            findFirst: jest.fn(),
        },
        semesterResult: {
            findFirst: jest.fn(),
        },
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ErpTool,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        tool = module.get<ErpTool>(ErpTool);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined with name ERP', () => {
        expect(tool.name).toBe('ERP');
    });

    describe('GET_SEMESTER_RESULT', () => {
        const studentContext: ToolExecutionContext = {
            institutionId: 'inst-1',
            userId: 'student-1',
            requestId: 'req-1',
            role: 'STUDENT',
        };

        it('should throw BadRequestException for missing enrollment number', async () => {
            await expect(tool.execute('GET_SEMESTER_RESULT', { semester: 5 }, studentContext)).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequestException for invalid semester', async () => {
            await expect(tool.execute('GET_SEMESTER_RESULT', { enrollmentNumber: '123', semester: -1 }, studentContext)).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequestException for unsupported operation', async () => {
            await expect(tool.execute('UNKNOWN_OP', {}, studentContext)).rejects.toThrow(BadRequestException);
        });

        it('should throw NotFoundException if authenticated student has no profile', async () => {
            mockPrismaService.studentProfile.findFirst.mockResolvedValue(null);
            await expect(tool.execute('GET_SEMESTER_RESULT', { enrollmentNumber: '123', semester: 5 }, studentContext)).rejects.toThrow(NotFoundException);
        });

        it('should throw ForbiddenException if student provides wrong enrollment number', async () => {
            mockPrismaService.studentProfile.findFirst.mockResolvedValue({
                id: 'profile-1',
                enrollmentNumber: 'REAL123',
            });
            await expect(tool.execute('GET_SEMESTER_RESULT', { enrollmentNumber: 'WRONG123', semester: 5 }, studentContext)).rejects.toThrow(ForbiddenException);
        });

        it('should return result for student with correct enrollment number', async () => {
            mockPrismaService.studentProfile.findFirst.mockResolvedValue({
                id: 'profile-1',
                enrollmentNumber: 'REAL123',
            });
            mockPrismaService.semesterResult.findFirst.mockResolvedValue({
                semester: 5,
                sgpa: 8.4,
                studentProfile: {
                    enrollmentNumber: 'REAL123',
                    user: { name: 'Demo Student' },
                },
                subjects: [
                    { courseCode: 'CS101', courseName: 'Intro', credits: 4, marks: 90, grade: 'A' }
                ],
            });

            const result = await tool.execute('GET_SEMESTER_RESULT', { enrollmentNumber: 'REAL123', semester: 5 }, studentContext) as any;
            expect(result.sgpa).toBe(8.4);
            expect(result.subjects.length).toBe(1);
        });

        it('should allow FACULTY to query any student in same institution', async () => {
            const facultyContext: ToolExecutionContext = {
                institutionId: 'inst-1',
                userId: 'faculty-1',
                requestId: 'req-1',
                role: 'FACULTY',
            };

            mockPrismaService.studentProfile.findFirst.mockResolvedValue({
                id: 'profile-2',
                enrollmentNumber: 'TARGET123',
                institutionId: 'inst-1',
            });
            mockPrismaService.semesterResult.findFirst.mockResolvedValue({
                semester: 5,
                sgpa: 7.0,
                studentProfile: {
                    enrollmentNumber: 'TARGET123',
                    user: { name: 'Target Student' },
                },
                subjects: [],
            });

            const result = await tool.execute('GET_SEMESTER_RESULT', { enrollmentNumber: 'TARGET123', semester: 5 }, facultyContext) as any;
            expect(result.sgpa).toBe(7.0);
        });

        it('should return NotFoundException for FACULTY if target student is not in institution', async () => {
            const facultyContext: ToolExecutionContext = {
                institutionId: 'inst-1',
                userId: 'faculty-1',
                requestId: 'req-1',
                role: 'FACULTY',
            };
            mockPrismaService.studentProfile.findFirst.mockResolvedValue(null); // Simulated Not Found

            await expect(tool.execute('GET_SEMESTER_RESULT', { enrollmentNumber: 'TARGET123', semester: 5 }, facultyContext)).rejects.toThrow(NotFoundException);
        });

        it('should throw ForbiddenException for unsupported roles', async () => {
            const unknownContext: ToolExecutionContext = {
                institutionId: 'inst-1',
                userId: 'user-1',
                requestId: 'req-1',
                role: 'GUEST',
            };
            await expect(tool.execute('GET_SEMESTER_RESULT', { enrollmentNumber: '123', semester: 5 }, unknownContext)).rejects.toThrow(ForbiddenException);
        });
    });
});
