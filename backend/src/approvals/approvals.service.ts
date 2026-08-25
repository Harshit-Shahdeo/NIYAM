import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import { ToolRegistry } from '../tools/tool-registry';
import { ToolExecutionContext } from '../tools/tool-execution-context';

export interface ReviewApprovalDto {
  decision: 'APPROVED' | 'REJECTED';
  approverId?: string;
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
  ) {}

  async listPending(institutionId?: string) {
    const where: Prisma.ApprovalWhereInput = {
      status: 'PENDING',
    };

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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async review(id: string, dto: ReviewApprovalDto) {
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
     * 2. Resolve the approval atomically.
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
          status: 'PENDING',
        },
        data: {
          status: resolvedStatus,
          approverId: dto.approverId || null,
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
     * 3. Handle rejection.
     */
    if (dto.decision === 'REJECTED') {
      await this.auditService.logEvent({
        institutionId: approval.institutionId,
        requestId: approval.requestId,
        userId:
          dto.approverId ||
          approval.request.userId,
        eventType: 'APPROVAL_REJECTED',
        actor: 'FACULTY',
        metadata: {
          approvalId: approval.id,
          notes:
            dto.notes ||
            'Approval rejected by supervisor',
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
        message: 'Request rejected by supervisor.',
      };
    }

    /*
     * 4. Record approval.
     *
     * Approval succeeding does not mean that the
     * requested action has been successfully executed.
     */
    await this.auditService.logEvent({
      institutionId: approval.institutionId,
      requestId: approval.requestId,
      userId:
        dto.approverId ||
        approval.request.userId,
      eventType: 'APPROVAL_GRANTED',
      actor: 'FACULTY',
      metadata: {
        approvalId: approval.id,
        notes:
          dto.notes ||
          'Approval granted by supervisor',
      },
    });

    /*
     * 5. Find and execute the proposed action.
     *
     * Only action lookup and execution are inside this
     * try/catch. This prevents a later audit failure from
     * incorrectly marking a successfully executed action
     * as FAILED.
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
       * The approval remains APPROVED because the human
       * successfully approved it.
       *
       * The service request FAILED because the actual
       * institutional action could not be completed.
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
     * 6. The institutional tool executed successfully.
     */
    await this.prisma.serviceRequest.update({
      where: {
        id: approval.requestId,
      },
      data: {
        status: 'COMPLETED',
      },
    });

    const ticket = (executionResult as Record<string, unknown>)?.ticket;

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
        ...(ticket ? { ticket: ticket as Prisma.InputJsonValue } : {}),
      },
    });

    /*
     * 7. Return successful execution result.
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
