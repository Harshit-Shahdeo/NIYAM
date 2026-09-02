import { Test, TestingModule } from '@nestjs/testing';
import { DocumentTool } from './document.tool';
import { PrismaService } from '../../database/prisma.service';
import { DocumentsService } from '../../documents/documents.service';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ToolExecutionContext } from '../tool-execution-context';

describe('DocumentTool', () => {
    let tool: DocumentTool;
    let prisma: PrismaService;
    let documentsService: DocumentsService;

    const mockPrisma = {
        studentProfile: {
            findFirst: jest.fn(),
        },
        examSchedule: {
            findMany: jest.fn(),
        },
        semesterResult: {
            findFirst: jest.fn(),
        },
    };

    const mockDocumentsService = {
        storeDocument: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DocumentTool,
                { provide: PrismaService, useValue: mockPrisma },
                { provide: DocumentsService, useValue: mockDocumentsService },
            ],
        }).compile();

        tool = module.get<DocumentTool>(DocumentTool);
        prisma = module.get<PrismaService>(PrismaService);
        documentsService = module.get<DocumentsService>(DocumentsService);
        
        jest.clearAllMocks();
    });

    const mockContext: ToolExecutionContext = {
        userId: 'user-1',
        institutionId: 'inst-1',
        role: 'STUDENT',
        requestId: 'req-1',
    };

    it('should be defined', () => {
        expect(tool).toBeDefined();
    });

    it('should reject unsupported operations', async () => {
        await expect(tool.execute('UNKNOWN', {}, mockContext)).rejects.toThrow(BadRequestException);
    });

    it('should reject invalid semester', async () => {
        await expect(tool.execute('GENERATE_ADMIT_CARD', {}, mockContext)).rejects.toThrow(BadRequestException);
        await expect(tool.execute('GENERATE_ADMIT_CARD', { semester: '5' }, mockContext)).rejects.toThrow(BadRequestException);
        await expect(tool.execute('GENERATE_ADMIT_CARD', { semester: -1 }, mockContext)).rejects.toThrow(BadRequestException);
    });

    it('should reject if non-student attempts to generate', async () => {
        const facultyContext: ToolExecutionContext = {
            ...mockContext,
            role: 'FACULTY',
        };
        await expect(tool.execute('GENERATE_ADMIT_CARD', { semester: 5 }, facultyContext)).rejects.toThrow(ForbiddenException);
    });

    it('should reject if student profile is not found', async () => {
        mockPrisma.studentProfile.findFirst.mockResolvedValue(null);
        await expect(tool.execute('GENERATE_ADMIT_CARD', { semester: 5 }, mockContext)).rejects.toThrow(NotFoundException);
    });

    it('should reject if student profile lacks program', async () => {
        mockPrisma.studentProfile.findFirst.mockResolvedValue({ program: null });
        await expect(tool.execute('GENERATE_ADMIT_CARD', { semester: 5 }, mockContext)).rejects.toThrow(BadRequestException);
    });

    it('should reject if exam schedule is missing', async () => {
        mockPrisma.studentProfile.findFirst.mockResolvedValue({
            program: 'B.Tech',
            institution: { name: 'Demo Inst' },
            user: { name: 'Student' }
        });
        mockPrisma.examSchedule.findMany.mockResolvedValue([]);

        await expect(tool.execute('GENERATE_ADMIT_CARD', { semester: 5 }, mockContext)).rejects.toThrow(NotFoundException);
    });

    it('should generate PDF and return download link for valid data', async () => {
        mockPrisma.studentProfile.findFirst.mockResolvedValue({
            program: 'B.Tech',
            enrollmentNumber: 'ENR-123',
            institution: { name: 'Demo Inst' },
            user: { name: 'Student Name' }
        });

        mockPrisma.examSchedule.findMany.mockResolvedValue([
            { courseCode: 'CS101', subjectName: 'Intro to CS', examDate: new Date(), examTime: '10:00 AM', examCenter: 'Hall A' }
        ]);

        const result = await tool.execute('GENERATE_ADMIT_CARD', { semester: 5 }, mockContext) as { message: string };

        expect(mockPrisma.studentProfile.findFirst).toHaveBeenCalledWith({
            where: { userId: 'user-1', institutionId: 'inst-1' },
            include: { institution: true, user: true },
        });

        expect(mockPrisma.examSchedule.findMany).toHaveBeenCalledWith({
            where: { institutionId: 'inst-1', program: 'B.Tech', semester: 5 },
            orderBy: { examDate: 'asc' },
        });

        expect(documentsService.storeDocument).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-1',
                institutionId: 'inst-1',
                documentType: 'ADMIT_CARD',
            })
        );

        expect(result.message).toContain('Admit card generated successfully');
        expect(result.message).toContain('[Download Admit Card](/api/documents/download/');
    });

    it('should reject invalid semester for GENERATE_RESULT', async () => {
        await expect(tool.execute('GENERATE_RESULT', {}, mockContext)).rejects.toThrow(BadRequestException);
        await expect(tool.execute('GENERATE_RESULT', { semester: '5' }, mockContext)).rejects.toThrow(BadRequestException);
        await expect(tool.execute('GENERATE_RESULT', { semester: -1 }, mockContext)).rejects.toThrow(BadRequestException);
    });

    it('should reject if non-student attempts to generate GENERATE_RESULT', async () => {
        const facultyContext: ToolExecutionContext = {
            ...mockContext,
            role: 'FACULTY',
        };
        await expect(tool.execute('GENERATE_RESULT', { semester: 5 }, facultyContext)).rejects.toThrow(ForbiddenException);
    });

    it('should reject if result is missing for GENERATE_RESULT', async () => {
        mockPrisma.studentProfile.findFirst.mockResolvedValue({
            id: 'prof-1',
            program: 'B.Tech',
            institution: { name: 'Demo Inst' },
            user: { name: 'Student' }
        });
        mockPrisma.semesterResult.findFirst.mockResolvedValue(null);

        await expect(tool.execute('GENERATE_RESULT', { semester: 5 }, mockContext)).rejects.toThrow(NotFoundException);
    });

    it('should generate RESULT PDF and return download link for valid data', async () => {
        mockPrisma.studentProfile.findFirst.mockResolvedValue({
            id: 'prof-1',
            program: 'B.Tech',
            enrollmentNumber: 'ENR-123',
            institution: { name: 'Demo Inst' },
            user: { name: 'Student Name' }
        });

        mockPrisma.semesterResult.findFirst.mockResolvedValue({
            semester: 5,
            sgpa: '8.5',
            subjects: [
                { courseCode: 'CS101', courseName: 'Intro to CS', credits: 4, marks: 85, grade: 'A' }
            ]
        });

        const result = await tool.execute('GENERATE_RESULT', { semester: 5 }, mockContext) as { message: string };

        expect(mockPrisma.studentProfile.findFirst).toHaveBeenCalledWith({
            where: { userId: 'user-1', institutionId: 'inst-1' },
            include: { institution: true, user: true },
        });

        expect(mockPrisma.semesterResult.findFirst).toHaveBeenCalledWith({
            where: { studentProfileId: 'prof-1', semester: 5, institutionId: 'inst-1' },
            include: { subjects: { orderBy: { courseCode: 'asc' } } },
        });

        expect(documentsService.storeDocument).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: 'user-1',
                institutionId: 'inst-1',
                documentType: 'RESULT',
            })
        );

        expect(result.message).toContain('Result document generated successfully');
        expect(result.message).toContain('[Download Result](/api/documents/download/');
    });
});
