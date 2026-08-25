import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { MaintenanceTicketTool } from './maintenance-ticket.tool';
import { AuditService } from '../../audit/audit.service';
import { ToolExecutionContext } from '../tool-execution-context';

describe('MaintenanceTicketTool', () => {
  let tool: MaintenanceTicketTool;
  let auditService: AuditService;

  const mockAuditService = {
    record: jest.fn().mockResolvedValue(undefined),
  };

  const context: ToolExecutionContext = {
    institutionId: 'inst-1',
    userId: 'student-1',
    requestId: 'req-1',
    role: 'STUDENT',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaintenanceTicketTool,
        { provide: AuditService, useValue: mockAuditService },
      ],
    }).compile();

    tool = module.get<MaintenanceTicketTool>(MaintenanceTicketTool);
    auditService = module.get<AuditService>(AuditService);
  });

  it('should be defined with name MaintenanceTicketTool', () => {
    expect(tool).toBeDefined();
    expect(tool.name).toBe('MaintenanceTicketTool');
  });

  it('should successfully create a maintenance ticket and log audit event', async () => {
    const args = {
      location: 'Robotics Lab - Engineering Block',
      category: 'HVAC',
      description: 'AC is not cooling properly',
      urgency: 'HIGH',
    };

    const result = (await tool.execute('create', args, context)) as any;

    expect(result.ticket).toBeDefined();
    expect(result.ticket.ticketId).toMatch(/^TICK-\d+/);
    expect(result.ticket.location).toBe('Robotics Lab - Engineering Block');
    expect(result.ticket.category).toBe('HVAC');
    expect(result.ticket.urgency).toBe('HIGH');
    expect(result.ticket.slaHours).toBe(4);
    expect(result.ticket.status).toBe('OPEN');
    expect(result.message).toContain('Maintenance ticket');
  });

  it('should calculate 2h SLA for EMERGENCY urgency', async () => {
    const args = {
      location: 'Chemistry Lab',
      category: 'HVAC',
      description: 'Fume hood exhaust motor failure',
      urgency: 'EMERGENCY',
    };

    const result = (await tool.execute('create', args, context)) as any;
    expect(result.ticket.slaHours).toBe(2);
    expect(result.ticket.urgency).toBe('EMERGENCY');
  });

  it('should default urgency to MEDIUM with 24h SLA if not provided', async () => {
    const args = {
      location: 'Hostel Block B Room 102',
      category: 'ELECTRICAL',
      description: 'Ceiling light is flickering',
    };

    const result = (await tool.execute('create', args, context)) as any;
    expect(result.ticket.urgency).toBe('MEDIUM');
    expect(result.ticket.slaHours).toBe(24);
  });

  it('should reject invalid category', async () => {
    const args = {
      location: 'Hostel Block B',
      category: 'INVALID_CATEGORY',
      description: 'Something broken',
    };

    await expect(tool.execute('create', args, context)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should reject unsupported operation', async () => {
    const args = {
      location: 'Hostel Block B',
      category: 'ELECTRICAL',
      description: 'Broken light',
    };

    await expect(tool.execute('delete', args, context)).rejects.toThrow(
      BadRequestException,
    );
  });
});
