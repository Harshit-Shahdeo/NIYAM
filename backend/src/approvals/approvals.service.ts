import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import { ToolRegistry } from '../tools/tool-registry';
import { ToolExecutionContext } from '../tools/tool-execution-context';

export interface ReviewApprovalDto {
  decision: 'APPROVED' | 'REJECTED';
  approverId?: string;
  notes?: string;
}

@Injectable()
export class ApprovalsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
    private readonly toolRegistry: ToolRegistry,
  ) {}

  async listPending(institutionId?: string) {
    const where: any = { status: 'PENDING' };
    if (institutionId) {
      where.institutionId = institutionId;
    }

    return this.prisma.approval.findMany({
      where,
      include: {
        request: {
          include: {
            user: true,
            booking: true,
          },
        },
        approver: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async review(id: string, dto: ReviewApprovalDto) {
    const approval = await this.prisma.approval.findUnique({
      where: { id },
      include: {
        request: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!approval) {
      throw new NotFoundException(`Approval with ID "${id}" not found.`);
    }

    if (approval.status !== 'PENDING') {
      throw new BadRequestException(
        `Approval has already been resolved with status "${approval.status}".`,
      );
    }

    const resolvedStatus =
      dto.decision === 'APPROVED' ? 'APPROVED' : 'REJECTED';

    const updatedApproval = await this.prisma.approval.update({
      where: { id },
      data: {
        status: resolvedStatus,
        approverId: dto.approverId || null,
        resolvedAt: new Date(),
      },
    });

    if (dto.decision === 'APPROVED') {
      await this.auditService.logEvent({
        institutionId: approval.institutionId,
        requestId: approval.requestId,
        userId: dto.approverId || approval.request.userId,
        eventType: 'APPROVAL_GRANTED',
        actor: 'FACULTY',
        metadata: {
          approvalId: approval.id,
          notes: dto.notes || 'Approval granted by supervisor',
        },
      });

      let executionResult: any = null;
      try {
        const proposedAction = await this.findProposedAction(
          approval.requestId,
        );
        if (proposedAction && proposedAction.tool) {
          const context: ToolExecutionContext = {
            institutionId: approval.institutionId,
            userId: approval.request.userId,
            requestId: approval.requestId,
          };

          executionResult = await this.toolRegistry.execute(
            proposedAction.tool,
            proposedAction.operation || 'execute',
            proposedAction.arguments || {},
            context,
          );
        }
      } catch (err: any) {
        console.error(
          `[ApprovalsService] Tool execution after approval failed: ${err.message}`,
        );
      }

      await this.prisma.serviceRequest.update({
        where: { id: approval.requestId },
        data: { status: 'COMPLETED' },
      });

      return {
        status: 'APPROVED',
        approval: updatedApproval,
        executionResult,
        message: 'Request approved and action successfully executed.',
      };
    } else {
      await this.auditService.logEvent({
        institutionId: approval.institutionId,
        requestId: approval.requestId,
        userId: dto.approverId || approval.request.userId,
        eventType: 'APPROVAL_REJECTED',
        actor: 'FACULTY',
        metadata: {
          approvalId: approval.id,
          notes: dto.notes || 'Approval rejected by supervisor',
        },
      });

      await this.prisma.serviceRequest.update({
        where: { id: approval.requestId },
        data: { status: 'REJECTED' },
      });

      return {
        status: 'REJECTED',
        approval: updatedApproval,
        message: 'Request rejected by supervisor.',
      };
    }
  }

  private async findProposedAction(requestId: string): Promise<any | null> {
    const actionProposedEvent = await this.prisma.auditEvent.findFirst({
      where: {
        requestId,
        eventType: 'ACTION_PROPOSED',
      },
      orderBy: { createdAt: 'desc' },
    });

    if (actionProposedEvent && actionProposedEvent.metadata) {
      return actionProposedEvent.metadata as any;
    }
    return null;
  }
}
