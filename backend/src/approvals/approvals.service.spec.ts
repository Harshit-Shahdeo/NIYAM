import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalsService } from './approvals.service';
import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import { ToolRegistry } from '../tools/tool-registry';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ApprovalsService', () => {
  let service: ApprovalsService;
  let prisma: PrismaService;
  let auditService: AuditService;
  let toolRegistry: ToolRegistry;

  const mockPrisma = {
    approval: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    serviceRequest: {
      update: jest.fn(),
    },
    auditEvent: {
      findFirst: jest.fn(),
    },
  };

  const mockAuditService = {
    logEvent: jest.fn(),
    record: jest.fn(),
  };

  const mockToolRegistry = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApprovalsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: AuditService, useValue: mockAuditService },
        { provide: ToolRegistry, useValue: mockToolRegistry },
      ],
    }).compile();

    service = module.get<ApprovalsService>(ApprovalsService);
    prisma = module.get<PrismaService>(PrismaService);
    auditService = module.get<AuditService>(AuditService);
    toolRegistry = module.get<ToolRegistry>(ToolRegistry);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listPending', () => {
    it('should query pending approvals', async () => {
      mockPrisma.approval.findMany.mockResolvedValue([]);
      const result = await service.listPending('inst-1');
      expect(prisma.approval.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: 'PENDING', institutionId: 'inst-1' },
        }),
      );
      expect(result).toEqual([]);
    });
  });

  describe('review', () => {
    it('should throw NotFoundException if approval does not exist', async () => {
      mockPrisma.approval.findUnique.mockResolvedValue(null);

      await expect(
        service.review('unknown-id', { decision: 'APPROVED' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if approval is not PENDING', async () => {
      mockPrisma.approval.findUnique.mockResolvedValue({
        id: 'app-1',
        status: 'APPROVED',
      });

      await expect(
        service.review('app-1', { decision: 'APPROVED' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should approve request and execute proposed action', async () => {
      const mockApproval = {
        id: 'app-1',
        institutionId: 'inst-1',
        requestId: 'req-1',
        status: 'PENDING',
        request: { userId: 'user-1' },
      };

      mockPrisma.approval.findUnique.mockResolvedValue(mockApproval);
      mockPrisma.approval.update.mockResolvedValue({
        ...mockApproval,
        status: 'APPROVED',
      });
      mockPrisma.auditEvent.findFirst.mockResolvedValue({
        eventType: 'ACTION_PROPOSED',
        metadata: {
          tool: 'LabBookingTool',
          operation: 'execute',
          arguments: { resource: 'lab-1' },
        },
      });
      mockToolRegistry.execute.mockResolvedValue({ bookingId: 'b-1' });

      const result = await service.review('app-1', {
        decision: 'APPROVED',
        approverId: 'approver-1',
        notes: 'Looks good',
      });

      expect(result.status).toBe('APPROVED');
      expect(prisma.approval.update).toHaveBeenCalled();
      expect(auditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'APPROVAL_GRANTED',
          institutionId: 'inst-1',
          requestId: 'req-1',
        }),
      );
      expect(toolRegistry.execute).toHaveBeenCalled();
      expect(prisma.serviceRequest.update).toHaveBeenCalledWith({
        where: { id: 'req-1' },
        data: { status: 'COMPLETED' },
      });
    });

    it('should reject request without executing proposed action', async () => {
      const mockApproval = {
        id: 'app-2',
        institutionId: 'inst-1',
        requestId: 'req-2',
        status: 'PENDING',
        request: { userId: 'user-1' },
      };

      mockPrisma.approval.findUnique.mockResolvedValue(mockApproval);
      mockPrisma.approval.update.mockResolvedValue({
        ...mockApproval,
        status: 'REJECTED',
      });

      const result = await service.review('app-2', {
        decision: 'REJECTED',
        approverId: 'approver-1',
        notes: 'Not allowed',
      });

      expect(result.status).toBe('REJECTED');
      expect(auditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: 'APPROVAL_REJECTED',
        }),
      );
      expect(toolRegistry.execute).not.toHaveBeenCalled();
      expect(prisma.serviceRequest.update).toHaveBeenCalledWith({
        where: { id: 'req-2' },
        data: { status: 'REJECTED' },
      });
    });
  });
});
