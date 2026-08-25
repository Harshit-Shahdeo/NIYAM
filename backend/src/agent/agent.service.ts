import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { PrismaService } from '../database/prisma.service';
import { AuditService } from '../audit/audit.service';

import { ToolRegistry } from '../tools/tool-registry';
import { ToolExecutionContext } from '../tools/tool-execution-context';

import { AgentReasonRequestDto } from './dto/agent-reason-request.dto';
import { AgentReasonResponseDto } from './dto/agent-reason-response.dto';

@Injectable()
export class AgentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly toolRegistry: ToolRegistry,
    private readonly auditService: AuditService,
  ) {}

  async reason(
    request: AgentReasonRequestDto,
  ): Promise<AgentReasonResponseDto> {
    /*
     * 1. Resolve the user from our database.
     *
     * The client tells us who they claim to be,
     * but institution context comes from our database.
     */
    const user = await this.prisma.user.findUnique({
      where: {
        id: request.user.id,
      },
      select: {
        id: true,
        institutionId: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    /*
     * 2. Create or update the institutional service request (Idempotent).
     */
    const serviceRequest = await this.prisma.serviceRequest.upsert({
      where: {
        externalId: request.request_id,
      },
      update: {
        message: request.message,
        status: 'PROCESSING',
      },
      create: {
        externalId: request.request_id,
        institutionId: user.institutionId,
        userId: user.id,
        message: request.message,
        status: 'PROCESSING',
      },
    });

    /*
     * 3. Record that the institution received
     *    the request.
     */
    await this.auditService.record(
      user.institutionId,
      serviceRequest.id,
      'REQUEST_RECEIVED',
      {
        actorId: user.id,
        metadata: {
          externalId: request.request_id,
        },
      },
    );

    /*
     * 4. Start AI reasoning.
     */
    await this.auditService.record(
      user.institutionId,
      serviceRequest.id,
      'AI_REASONING_STARTED',
    );

    let response;
    const aiServiceUrl =
      process.env.AI_SERVICE_URL || 'http://localhost:8000/agent/reason';

    try {
      response = await firstValueFrom(
        this.httpService.post<AgentReasonResponseDto>(
          aiServiceUrl,
          request,
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

      throw new ServiceUnavailableException('AI reasoning service unavailable');
    }

    /*
     * 5. Validate the AI response.
     */
    const aiResponse = plainToInstance(AgentReasonResponseDto, response.data);

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

    /*
     * 6. Record successful AI reasoning.
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
          uncertaintyDetected: aiResponse.uncertainty_detected,
          policyConflictDetected: aiResponse.policy_conflict_detected,
        },
      },
    );

    /*
     * 7. Persist the AI's high-level reasoning result.
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
     * 8. Handle rejection.
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
     * 9. Handle human approval.
     */
    if (aiResponse.decision === 'REQUIRE_HUMAN_APPROVAL') {
      if (aiResponse.proposed_action) {
        await this.auditService.record(
          user.institutionId,
          serviceRequest.id,
          'ACTION_PROPOSED',
          {
            metadata: {
              tool: aiResponse.proposed_action.tool,
              operation: aiResponse.proposed_action.operation,
              arguments: aiResponse.proposed_action
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
     * 10. ALLOW - Actionable vs Informational.
     */
    if (!aiResponse.proposed_action) {
      // If there's no action, this is an informational query (e.g., POLICY_INQUIRY).
      // Mark as completed and return the AI's reason to the user.
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
     * 11. Record the proposed institutional action.
     */
    await this.auditService.record(
      user.institutionId,
      serviceRequest.id,
      'ACTION_PROPOSED',
      {
        metadata: {
          tool: aiResponse.proposed_action.tool,
          operation: aiResponse.proposed_action.operation,
          arguments: aiResponse.proposed_action
            .arguments as Prisma.InputJsonValue,
        },
      },
    );

    /*
     * 12. Build trusted execution context.
     *
     * None of these values come from the AI.
     */
    const context: ToolExecutionContext = {
      userId: user.id,
      institutionId: user.institutionId,
      requestId: serviceRequest.id,
    };

    /*
     * 13. Execute the AI-proposed institutional action.
     */
    let executionResult: unknown;

    try {
      executionResult = await this.toolRegistry.execute(
        aiResponse.proposed_action.tool,
        aiResponse.proposed_action.operation,
        aiResponse.proposed_action.arguments,
        context,
      );
    } catch (error) {
      console.error('Institutional tool execution failed:', error);

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
            reason: 'Institutional tool execution failed',
          },
        },
      );

      throw error;
    }

    /*
     * 14. Record successful institutional execution.
     */
    const ticket = (executionResult as Record<string, unknown>)?.ticket;

    await this.auditService.record(
      user.institutionId,
      serviceRequest.id,
      'ACTION_EXECUTED',
      {
        actorId: user.id,
        metadata: {
          tool: aiResponse.proposed_action.tool,
          operation: aiResponse.proposed_action.operation,
          ...(ticket ? { ticket: ticket as Prisma.InputJsonValue } : {}),
        },
      },
    );

    /*
     * 15. Mark the request as completed.
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

    return aiResponse;
  }
}
