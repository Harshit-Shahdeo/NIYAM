import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import { ToolRegistry } from '../tools/tool-registry';
import { ToolExecutionContext } from '../tools/tool-execution-context';

export interface ReviewApprovalDto {
  decision: 'APPROVED' | 'REJECTED';
  notes?: string;
}

interface ProposedAction {
  tool: string;
  operation: string;
  arguments: Record<string, unknown>;
}

@Injectable()
export class ApprovalsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
    private readonly toolRegistry: ToolRegistry,
  ) { }

  async listPending(institutionId: string) {
    const where: Prisma.ApprovalWhereInput = {
      status: 'PENDING',
      institutionId,
    };

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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async review(
    id: string,
    dto: ReviewApprovalDto,
    approverId: string,
    institutionId: string,
    approverRole: 'STUDENT' | 'FACULTY' | 'ADMIN',
  ) {
    /*
     * 1. Load the approval and its associated request.
     */
    const approval = await this.prisma.approval.findUnique({
      where: {
        id,
      },
      include: {
        request: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!approval) {
      throw new NotFoundException(
        `Approval with ID "${id}" not found.`,
      );
    }

    /*
     * 2. Ensure the approver belongs to the same institution.
     */
    if (approval.institutionId !== institutionId) {
      throw new ForbiddenException(
        'You do not have permission to review this approval.',
      );
    }

    /*
     * 3. Resolve the approval atomically.
     *
     * Only update if the approval is still PENDING.
     * This prevents duplicate resolution and duplicate
     * tool execution from concurrent requests.
     */
    const resolvedStatus =
      dto.decision === 'APPROVED'
        ? 'APPROVED'
        : 'REJECTED';

    const updateResult =
      await this.prisma.approval.updateMany({
        where: {
          id,
          institutionId,
          status: 'PENDING',
        },
        data: {
          status: resolvedStatus,
          approverId,
          resolvedAt: new Date(),
        },
      });

    if (updateResult.count === 0) {
      throw new BadRequestException(
        'Approval has already been resolved.',
      );
    }

    const updatedApproval =
      await this.prisma.approval.findUnique({
        where: {
          id,
        },
      });

    if (!updatedApproval) {
      throw new NotFoundException(
        `Approval with ID "${id}" not found.`,
      );
    }

    /*
     * 4. Handle rejection.
     *
     * No tool should execute if the approval is rejected.
     */
    if (dto.decision === 'REJECTED') {
      await this.auditService.logEvent({
        institutionId: approval.institutionId,
        requestId: approval.requestId,
        userId: approverId,
        eventType: 'APPROVAL_REJECTED',
        actor: approverRole,
        metadata: {
          approvalId: approval.id,
          notes:
            dto.notes ||
            'Approval rejected by administrator',
        },
      });

      await this.prisma.serviceRequest.update({
        where: {
          id: approval.requestId,
        },
        data: {
          status: 'REJECTED',
        },
      });

      return {
        status: 'REJECTED',
        approval: updatedApproval,
        message: 'Request rejected by administrator.',
      };
    }

    /*
     * 5. Record approval.
     *
     * Approval succeeding does not mean that the
     * requested institutional action has successfully executed.
     */
    await this.auditService.logEvent({
      institutionId: approval.institutionId,
      requestId: approval.requestId,
      userId: approverId,
      eventType: 'APPROVAL_GRANTED',
      actor: approverRole,
      metadata: {
        approvalId: approval.id,
        notes:
          dto.notes ||
          'Approval granted by administrator',
      },
    });

    /*
     * 6. Find and execute the proposed action.
     */
    let executionResult: unknown;
    let proposedAction: ProposedAction;

    try {
      const action =
        await this.findProposedAction(
          approval.requestId,
        );

      if (!action) {
        throw new BadRequestException(
          'No proposed action found for this approval request.',
        );
      }

      proposedAction = action;

      const context: ToolExecutionContext = {
        institutionId: approval.institutionId,
        userId: approval.request.userId,
        requestId: approval.requestId,
        role: approval.request.user.role,
      };

      executionResult =
        await this.toolRegistry.execute(
          proposedAction.tool,
          proposedAction.operation,
          proposedAction.arguments,
          context,
        );
    } catch (error) {
      console.error(
        '[ApprovalsService] Tool execution after approval failed:',
        error,
      );

      /*
       * The human approval remains APPROVED because
       * the administrator successfully approved it.
       *
       * However, the actual institutional action failed.
       */
      await this.prisma.serviceRequest.update({
        where: {
          id: approval.requestId,
        },
        data: {
          status: 'FAILED',
        },
      });

      await this.auditService.logEvent({
        institutionId: approval.institutionId,
        requestId: approval.requestId,
        userId: approval.request.userId,
        eventType: 'ACTION_EXECUTION_FAILED',
        actor: 'SYSTEM',
        metadata: {
          approvalId: approval.id,
          error:
            error instanceof Error
              ? error.message
              : 'Unknown execution error',
        },
      });

      throw error;
    }

    /*
     * 7. The institutional tool executed successfully.
     */
    await this.prisma.serviceRequest.update({
      where: {
        id: approval.requestId,
      },
      data: {
        status: 'COMPLETED',
      },
    });

    await this.auditService.logEvent({
      institutionId: approval.institutionId,
      requestId: approval.requestId,
      userId: approval.request.userId,
      eventType: 'ACTION_EXECUTED',
      actor: 'SYSTEM',
      metadata: {
        approvalId: approval.id,
        tool: proposedAction.tool,
        operation: proposedAction.operation,
      },
    });

    /*
     * 8. Return the successful result.
     */
    return {
      status: 'APPROVED',
      approval: updatedApproval,
      executionResult,
      message:
        'Request approved and action successfully executed.',
    };
  }

  private async findProposedAction(
    requestId: string,
  ): Promise<ProposedAction | null> {
    const actionProposedEvent =
      await this.prisma.auditEvent.findFirst({
        where: {
          requestId,
          eventType: 'ACTION_PROPOSED',
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    if (!actionProposedEvent?.metadata) {
      return null;
    }

    const metadata =
      actionProposedEvent.metadata;

    /*
     * Prisma JSON metadata must be validated before
     * being used as an executable action.
     */
    if (
      typeof metadata !== 'object' ||
      metadata === null ||
      Array.isArray(metadata)
    ) {
      throw new BadRequestException(
        'Invalid proposed action metadata.',
      );
    }

    const action =
      metadata as Record<string, unknown>;

    if (
      typeof action.tool !== 'string' ||
      typeof action.operation !== 'string' ||
      typeof action.arguments !== 'object' ||
      action.arguments === null ||
      Array.isArray(action.arguments)
    ) {
      throw new BadRequestException(
        'Invalid proposed action.',
      );
    }

    return {
      tool: action.tool,
      operation: action.operation,
      arguments:
        action.arguments as Record<string, unknown>,
    };
  }
}