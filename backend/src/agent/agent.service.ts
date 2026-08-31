import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
  HttpException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';
import { StudentsService } from '../students/students.service';

import { ToolRegistry } from '../tools/tool-registry';
import { ToolExecutionContext } from '../tools/tool-execution-context';

import { AgentReasonRequestDto } from './dto/agent-reason-request.dto';
import { AgentReasonResponseDto, ExecutionErrorDto } from './dto/agent-reason-response.dto';

@Injectable()
export class AgentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly toolRegistry: ToolRegistry,
    private readonly auditService: AuditService,
    private readonly studentsService: StudentsService,
  ) { }

  async reason(
    request: AgentReasonRequestDto,
    authenticatedUser: {
      userId: string;
      institutionId: string;
      role: string;
    },
    conversationId?: string,
  ): Promise<AgentReasonResponseDto> {
    /*
     * 1. Resolve the authenticated user.
     *
     * The JWT determines who is actually making the request.
     * We do not trust identity information from the request body.
     */
    const user = await this.prisma.user.findFirst({
      where: {
        id: authenticatedUser.userId,
        institutionId: authenticatedUser.institutionId,
      },
      include: {
        department: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    /*
     * 2. Build trusted context.
     *
     * Student context is fetched from our database only when
     * the authenticated user is a STUDENT.
     */
    let studentContext: Record<string, unknown> | undefined;

    if (user.role === 'STUDENT') {
      try {
        const studentProfile =
          await this.studentsService.getMyStudentProfile(
            user.id,
            user.institutionId,
          );

        studentContext =
          studentProfile as Record<string, unknown>;
      } catch {
        /*
         * Gracefully continue if a student profile does not exist.
         */
      }
    }

    /*
     * 3. Build the trusted request sent to FastAPI.
     *
     * conversationId is intentionally NOT sent to FastAPI.
     * It is an internal database relationship belonging to
     * the NestJS application.
     */
    const aiRequest = {
      request_id: request.request_id,
      message: request.message,
      conversation: request.conversation,
      user: {
        id: user.id,
        role: user.role,
        department: user.department?.code,
      },
      ...(studentContext
        ? {
          student_context: studentContext,
        }
        : {}),
    };

    /*
     * 4. Create or update the institutional service request.
     *
     * The request is idempotent using request_id.
     *
     * conversationId is stored here so that future events,
     * such as approval or rejection, can be delivered back
     * into the correct chat conversation.
     */
    const serviceRequest =
      await this.prisma.serviceRequest.upsert({
        where: {
          externalId: request.request_id,
        },
        update: {
          message: request.message,
          status: 'PROCESSING',
          ...(conversationId !== undefined
            ? {
              conversationId,
            }
            : {}),
        },
        create: {
          externalId: request.request_id,
          institutionId: user.institutionId,
          userId: user.id,
          conversationId,
          message: request.message,
          status: 'PROCESSING',
        },
      });

    /*
     * 5. Record request receipt.
     */
    await this.auditService.record(
      user.institutionId,
      serviceRequest.id,
      'REQUEST_RECEIVED',
      {
        actorId: user.id,
        metadata: {
          externalId: request.request_id,
          ...(conversationId
            ? {
              conversationId,
            }
            : {}),
        },
      },
    );

    /*
     * 6. Record AI reasoning start.
     */
    await this.auditService.record(
      user.institutionId,
      serviceRequest.id,
      'AI_REASONING_STARTED',
    );

    let response;

    const aiServiceUrl =
      process.env.AI_SERVICE_URL ||
      'http://localhost:8000/agent/reason';

    /*
     * 7. Send trusted request to FastAPI.
     */
    try {
      response = await firstValueFrom(
        this.httpService.post<AgentReasonResponseDto>(
          aiServiceUrl,
          aiRequest,
        ),
      );
    } catch (error) {
      console.error('FastAPI request failed:', error);

      await this.prisma.serviceRequest.update({
        where: {
          id: serviceRequest.id,
        },
        data: {
          status: 'FAILED',
        },
      });

      await this.auditService.record(
        user.institutionId,
        serviceRequest.id,
        'REQUEST_FAILED',
        {
          metadata: {
            reason: 'AI reasoning service unavailable',
          },
        },
      );

      throw new ServiceUnavailableException(
        'AI reasoning service unavailable',
      );
    }

    /*
     * 8. Validate the AI response.
     *
     * FastAPI is treated as a separate service.
     * NestJS validates its response before trusting or
     * executing anything from it.
     */
    const aiResponse = plainToInstance(
      AgentReasonResponseDto,
      response.data,
    );

    const errors = await validate(aiResponse, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      console.error('Invalid AI response:', errors);

      await this.prisma.serviceRequest.update({
        where: {
          id: serviceRequest.id,
        },
        data: {
          status: 'FAILED',
        },
      });

      await this.auditService.record(
        user.institutionId,
        serviceRequest.id,
        'REQUEST_FAILED',
        {
          metadata: {
            reason: 'Invalid AI response',
          },
        },
      );

      throw new InternalServerErrorException(
        'AI reasoning service returned an invalid response',
      );
    }
    // ADD THIS
    aiResponse.service_request_id=serviceRequest.id;

    /*
     * 9. Record successful AI reasoning.
     */
    await this.auditService.record(
      user.institutionId,
      serviceRequest.id,
      'AI_REASONING_COMPLETED',
      {
        metadata: {
          intent: aiResponse.intent,
          decision: aiResponse.decision,
          confidenceScore: aiResponse.confidence_score,
          uncertaintyDetected:
            aiResponse.uncertainty_detected,
          policyConflictDetected:
            aiResponse.policy_conflict_detected,
        },
      },
    );

    /*
     * 10. Persist the AI's high-level reasoning result.
     */
    await this.prisma.serviceRequest.update({
      where: {
        id: serviceRequest.id,
      },
      data: {
        intent: aiResponse.intent,
      },
    });

    /*
     * 11. Handle rejection.
     */
    if (aiResponse.decision === 'REJECT') {
      await this.prisma.serviceRequest.update({
        where: {
          id: serviceRequest.id,
        },
        data: {
          status: 'REJECTED',
        },
      });

      return aiResponse;
    }

    /*
     * 12. Handle requests requiring human approval.
     */
    if (
      aiResponse.decision ===
      'REQUIRE_HUMAN_APPROVAL'
    ) {
      if (aiResponse.proposed_action) {
        await this.auditService.record(
          user.institutionId,
          serviceRequest.id,
          'ACTION_PROPOSED',
          {
            metadata: {
              tool: aiResponse.proposed_action.tool,
              operation:
                aiResponse.proposed_action.operation,
              arguments:
                aiResponse.proposed_action
                  .arguments as Prisma.InputJsonValue,
            },
          },
        );
      }

      await this.prisma.approval.upsert({
        where: {
          requestId: serviceRequest.id,
        },
        update: {
          status: 'PENDING',
          reason: aiResponse.reason,
        },
        create: {
          institutionId: user.institutionId,
          requestId: serviceRequest.id,
          status: 'PENDING',
          reason: aiResponse.reason,
        },
      });

      await this.auditService.record(
        user.institutionId,
        serviceRequest.id,
        'APPROVAL_REQUESTED',
        {
          metadata: {
            reason: aiResponse.reason,
          },
        },
      );

      await this.prisma.serviceRequest.update({
        where: {
          id: serviceRequest.id,
        },
        data: {
          status: 'WAITING_FOR_APPROVAL',
        },
      });

      return aiResponse;
    }

    /*
     * 13. Handle informational ALLOW responses.
     */
    if (!aiResponse.proposed_action) {
      await this.prisma.serviceRequest.update({
        where: {
          id: serviceRequest.id,
        },
        data: {
          status: 'COMPLETED',
        },
      });

      await this.auditService.record(
        user.institutionId,
        serviceRequest.id,
        'REQUEST_COMPLETED',
      );

      return aiResponse;
    }

    /*
     * 14. Record the proposed institutional action.
     */
    await this.auditService.record(
      user.institutionId,
      serviceRequest.id,
      'ACTION_PROPOSED',
      {
        metadata: {
          tool: aiResponse.proposed_action.tool,
          operation:
            aiResponse.proposed_action.operation,
          arguments:
            aiResponse.proposed_action
              .arguments as Prisma.InputJsonValue,
        },
      },
    );

    /*
     * 15. Build trusted execution context.
     *
     * These values never come from the AI model.
     */
    const context: ToolExecutionContext = {
      userId: user.id,
      institutionId: user.institutionId,
      requestId: serviceRequest.id,
      role: user.role,
    };

    /*
     * 16. Execute the AI-proposed institutional action.
     */
    let toolResult: unknown;

    try {
      toolResult = await this.toolRegistry.execute(
        aiResponse.proposed_action.tool,
        aiResponse.proposed_action.operation,
        aiResponse.proposed_action.arguments,
        context,
      );
    } catch (error) {
      if (error instanceof HttpException && error.getStatus() < 500) {
        console.warn(
          'Expected institutional tool execution failure (4xx):',
          error.message,
        );

        await this.prisma.serviceRequest.update({
          where: {
            id: serviceRequest.id,
          },
          data: {
            status: 'COMPLETED',
          },
        });

        await this.auditService.record(
          user.institutionId,
          serviceRequest.id,
          'ACTION_EXECUTION_FAILED',
          {
            metadata: {
              reason: error.message,
              status: error.getStatus(),
            },
          },
        );

        aiResponse.execution_result = undefined;
        const responsePayload = error.getResponse();

        aiResponse.execution_error = {
          code: error.getStatus(),
          message: error.message,
          ...(typeof responsePayload === 'object' && responsePayload !== null
            ? responsePayload
            : typeof responsePayload === 'string'
              ? { message: responsePayload }
              : {}),
        } as ExecutionErrorDto;

        return aiResponse;
      }

      console.error(
        'Institutional tool execution failed unexpectedly:',
        error,
      );

      await this.prisma.serviceRequest.update({
        where: {
          id: serviceRequest.id,
        },
        data: {
          status: 'FAILED',
        },
      });

      await this.auditService.record(
        user.institutionId,
        serviceRequest.id,
        'REQUEST_FAILED',
        {
          metadata: {
            reason:
              'Institutional tool execution failed',
          },
        },
      );

      throw error;
    }

    /*
     * 17. Attach the trusted tool result to the response.
     */
    if (
      toolResult !== null &&
      typeof toolResult === 'object' &&
      !Array.isArray(toolResult)
    ) {
      aiResponse.execution_result =
        toolResult as Record<string, unknown>;
    } else {
      aiResponse.execution_result = {
        value: toolResult,
      };
    }

    /*
     * 18. Record successful institutional execution.
     */
    const ticket =
      (toolResult as Record<string, unknown>)?.ticket;

    await this.auditService.record(
      user.institutionId,
      serviceRequest.id,
      'ACTION_EXECUTED',
      {
        actorId: user.id,
        metadata: {
          tool: aiResponse.proposed_action.tool,
          operation: aiResponse.proposed_action.operation,
          ...(ticket
            ? {
              ticket:
                ticket as Prisma.InputJsonValue,
            }
            : {}),
        },
      },
    );

    /*
     * 19. Mark the request as completed.
     */
    await this.prisma.serviceRequest.update({
      where: {
        id: serviceRequest.id,
      },
      data: {
        status: 'COMPLETED',
      },
    });

    await this.auditService.record(
      user.institutionId,
      serviceRequest.id,
      'REQUEST_COMPLETED',
    );

    /*
     * 20. Return the AI reasoning plus the trusted
     * institutional tool result.
     */
    return aiResponse;
  }
}