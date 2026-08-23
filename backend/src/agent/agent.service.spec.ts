import { Test, TestingModule } from '@nestjs/testing';
import { AgentService } from './agent.service';

import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../database/prisma.service';
import { ToolRegistry } from '../tools/tool-registry';
import { AuditService } from '../audit/audit.service';

describe('AgentService', () => {
  let service: AgentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgentService,
        { provide: HttpService, useValue: { post: jest.fn() } },
        { provide: PrismaService, useValue: { serviceRequest: { create: jest.fn(), update: jest.fn() }, user: { findUnique: jest.fn() } } },
        { provide: ToolRegistry, useValue: { execute: jest.fn() } },
        { provide: AuditService, useValue: { record: jest.fn(), logEvent: jest.fn() } },
      ],
    }).compile();

    service = module.get<AgentService>(AgentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
