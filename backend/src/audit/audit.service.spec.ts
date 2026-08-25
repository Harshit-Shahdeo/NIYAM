import { Test, TestingModule } from '@nestjs/testing';
import { AuditService } from './audit.service';
import { PrismaService } from '../database/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('AuditService', () => {
  let service: AuditService;
  let prisma: PrismaService;

  const mockPrisma = {
    auditEvent: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    serviceRequest: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<AuditService>(AuditService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('record', () => {
    it('should create an audit event record', async () => {
      mockPrisma.auditEvent.create.mockResolvedValue({ id: 'evt-1' });

      await service.record('inst-1', 'req-1', 'REQUEST_RECEIVED', {
        actorId: 'user-1',
        metadata: { info: 'test' },
      });

      expect(prisma.auditEvent.create).toHaveBeenCalledWith({
        data: {
          institutionId: 'inst-1',
          requestId: 'req-1',
          actorId: 'user-1',
          eventType: 'REQUEST_RECEIVED',
          metadata: { info: 'test' },
        },
      });
    });
  });

  describe('logEvent', () => {
    it('should forward event and merge actor role into metadata', async () => {
      mockPrisma.auditEvent.create.mockResolvedValue({ id: 'evt-2' });

      await service.logEvent({
        institutionId: 'inst-1',
        requestId: 'req-1',
        userId: 'user-1',
        eventType: 'APPROVAL_GRANTED',
        actor: 'FACULTY',
        metadata: { notes: 'approved' },
      });

      expect(prisma.auditEvent.create).toHaveBeenCalledWith({
        data: {
          institutionId: 'inst-1',
          requestId: 'req-1',
          actorId: 'user-1',
          eventType: 'APPROVAL_GRANTED',
          metadata: { notes: 'approved', actorRole: 'FACULTY' },
        },
      });
    });
  });

  describe('getRequestTimeline', () => {
    it('should throw NotFoundException if request does not exist', async () => {
      mockPrisma.serviceRequest.findFirst.mockResolvedValue(null);

      await expect(service.getRequestTimeline('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return mapped timeline when request exists', async () => {
      const mockReq = {
        id: 'req-1',
        externalId: 'req-ext-1',
        userId: 'student-1',
        institutionId: 'inst-1',
        user: {
          id: 'student-1',
          name: 'Student',
          email: 's@test.edu',
          role: 'STUDENT',
          passwordHash: 'secret-hash-123',
        },
      };
      const mockEvents = [
        {
          id: 'evt-1',
          eventType: 'REQUEST_RECEIVED',
          actor: { id: 'student-1', name: 'Student', email: 's@test.edu', role: 'STUDENT' },
          metadata: {},
          createdAt: new Date('2026-08-23T00:00:00Z'),
        },
      ];

      mockPrisma.serviceRequest.findFirst.mockResolvedValue(mockReq);
      mockPrisma.auditEvent.findMany.mockResolvedValue(mockEvents);

      const result = await service.getRequestTimeline('req-1', {
        userId: 'student-1',
        institutionId: 'inst-1',
        role: 'STUDENT',
      });

      expect(result.request.id).toBe('req-1');
      expect((result.request.user as any).passwordHash).toBeUndefined();
      expect(result.totalEvents).toBe(1);
      expect(result.timeline[0].step).toBe(1);
      expect(result.timeline[0].eventType).toBe('REQUEST_RECEIVED');
      expect(result.timeline[0].actor?.name).toBe('Student');
    });

    it('should throw ForbiddenException if student tries to access another student request', async () => {
      const mockReq = {
        id: 'req-2',
        externalId: 'req-ext-2',
        userId: 'other-student',
        institutionId: 'inst-1',
      };

      mockPrisma.serviceRequest.findFirst.mockResolvedValue(mockReq);

      await expect(
        service.getRequestTimeline('req-2', {
          userId: 'student-1',
          institutionId: 'inst-1',
          role: 'STUDENT',
        }),
      ).rejects.toThrow();
    });
  });
});
