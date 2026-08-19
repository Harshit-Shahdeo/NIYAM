import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import { ToolRegistry } from '../tools/tool-registry';
import { AgentReasonRequestDto } from './dto/agent-reason-request.dto';
import { AgentReasonResponseDto } from './dto/agent-reason-response.dto';
export declare class AgentService {
    private readonly httpService;
    private readonly prisma;
    private readonly toolRegistry;
    private readonly auditService;
    constructor(httpService: HttpService, prisma: PrismaService, toolRegistry: ToolRegistry, auditService: AuditService);
    reason(request: AgentReasonRequestDto): Promise<AgentReasonResponseDto>;
}
