import { PrismaService } from '../../../../database/prisma.service';
import { InstitutionalTool } from '../../../institutional-tools';
import { ToolExecutionContext } from '../../../tool-execution-context';
import { AuditService } from '../../../../audit/audit.service';
import { SchedulingService } from '../../core/scheduling.service';
export declare class LabBookingTool extends InstitutionalTool {
    private readonly prisma;
    private readonly schedulingService;
    private readonly auditService;
    readonly name = "LabBookingTool";
    constructor(prisma: PrismaService, schedulingService: SchedulingService, auditService: AuditService);
    execute(operation: string, arguments_: Record<string, unknown>, context: ToolExecutionContext): Promise<unknown>;
}
