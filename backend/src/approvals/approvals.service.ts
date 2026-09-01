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
      institutionId,
    };

    return this.prisma.approval.findMany({
      where,
      include: {
        request: {
          include: {
            user: true,
            booking: true,
            conversation: true,
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
    approverId: string = 'admin_001',
    institutionId?: string,
    approverRole: 'STUDENT' | 'FACULTY' | 'ADMIN' = 'ADMIN',
  ) {
    /*
     * 1. Load the approval and its associated request.
     *
     * The request includes the conversation that originally
     * created this institutional request.
     */
    const approval = await this.prisma.approval.findUnique({
      where: {
        id,
      },
      include: {
        request: {
          include: {
            user: true,
            conversation: true,
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
     * 2. Ensure only ADMIN users can review and approve tickets.
     */
    if (approverRole !== 'ADMIN') {
      throw new ForbiddenException(
        'Only ADMIN users have permission to review and approve requests. Students and Faculty are not permitted.',
      );
    }

    /*
     * 3. Ensure the approver belongs to the same institution.
     */
    if (
      institutionId &&
      approval.institutionId !== institutionId
    ) {
      throw new ForbiddenException(
        'You do not have permission to review this approval.',
      );
    }

    /*
     * 4. Resolve the approval atomically.
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
          institutionId: approval.institutionId,
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
     * 5. Handle rejection.
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

      await this.sendApprovalMessage(
        approval.request.conversationId,
        approval.request.userId,
        `Your request was reviewed and rejected by the administrator.${dto.notes
          ? ` Reason: ${dto.notes}`
          : ''
        }`,
      );

      return {
        status: 'REJECTED',
        approval: updatedApproval,
        message: 'Request rejected by administrator.',
      };
    }

    /*
     * 6. Record approval.
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
     * 7. Find and execute the proposed action.
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
        role: approval.request.user?.role ?? 'STUDENT',
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

      await this.sendApprovalMessage(
        approval.request.conversationId,
        approval.request.userId,
        'Your request was approved, but the requested action could not be completed successfully. Please contact the administrator or try again.',
      );

      throw error;
    }

    /*
     * 8. The institutional tool executed successfully.
     */
    await this.prisma.serviceRequest.update({
      where: {
        id: approval.requestId,
      },
      data: {
        status: 'COMPLETED',
      },
    });

    const ticket =
      (executionResult as Record<string, unknown>)
        ?.ticket;

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
        ...(ticket
          ? {
            ticket:
              ticket as Prisma.InputJsonValue,
          }
          : {}),
      },
    });

    /*
     * 9. Notify the user in the exact conversation
     * that created this request.
     */
    await this.sendApprovalMessage(
      approval.request.conversationId,
      approval.request.userId,
      this.getSuccessfulExecutionMessage(
        executionResult,
      ),
    );

    /*
     * 10. Return the successful result.
     */
    return {
      status: 'APPROVED',
      approval: updatedApproval,
      executionResult,
      message:
        'Request approved and action successfully executed.',
    };
  }

  /*
   * Send an approval/result message to the exact
   * conversation associated with the ServiceRequest.
   *
   * If the request did not originate from chat,
   * conversationId will be null and we simply skip
   * the chat notification.
   */
  private async sendApprovalMessage(
    conversationId: string | null,
    userId: string,
    content: string,
  ) {
    if (!conversationId) {
      return;
    }

    const conversation =
      await this.prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId,
        },
      });

    /*
     * Do not fail the approval or institutional action
     * merely because the original conversation no longer
     * exists.
     */
    if (!conversation) {
      return;
    }

    await this.prisma.$transaction([
      this.prisma.message.create({
        data: {
          conversationId: conversation.id,
          userId,
          role: 'ASSISTANT',
          content,
        },
      }),

      this.prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          updatedAt: new Date(),
        },
      }),
    ]);
  }

  /*
   * Generate a user-facing result from the trusted
   * institutional tool execution result.
   *
   * The LLM does not generate this post-approval
   * confirmation.
   */
  private getSuccessfulExecutionMessage(
    executionResult: unknown,
  ): string {
    if (
      executionResult &&
      typeof executionResult === 'object' &&
      !Array.isArray(executionResult)
    ) {
      const result =
        executionResult as Record<string, unknown>;

      if (typeof result.message === 'string') {
        return result.message;
      }

      if (typeof result.ticket === 'string') {
        return `Your request has been approved and successfully completed. Reference: ${result.ticket}`;
      }
    }

    return (
      'Your request has been approved and the requested action ' +
      'was successfully completed.'
    );
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