import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AuditEventType, Prisma } from '@prisma/client';

export interface LogEventDto {
  institutionId: string;
  requestId: string;
  userId?: string;
  eventType: AuditEventType;
  actor?: string;
  metadata?: Prisma.InputJsonValue;
}

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async record(
    institutionId: string,
    requestId: string,
    eventType: AuditEventType,
    options?: {
      actorId?: string;
      metadata?: Prisma.InputJsonValue;
    },
  ): Promise<void> {
    await this.prisma.auditEvent.create({
      data: {
        institutionId,
        requestId,
        actorId: options?.actorId,
        eventType,
        metadata: options?.metadata,
      },
    });
  }

  async logEvent(dto: LogEventDto): Promise<void> {
    let metadata = dto.metadata;

    if (dto.actor) {
      const existing =
        dto.metadata && typeof dto.metadata === 'object' && !Array.isArray(dto.metadata)
          ? (dto.metadata as Record<string, unknown>)
          : {};
      metadata = { ...existing, actorRole: dto.actor };
    }

    await this.record(dto.institutionId, dto.requestId, dto.eventType, {
      actorId: dto.userId,
      metadata,
    });
  }

  async listRequests(
    limit: number = 20,
    offset: number = 0,
    institutionId?: string,
  ) {
    const where: Prisma.ServiceRequestWhereInput = {};
    if (institutionId) {
      where.institutionId = institutionId;
    }

    return this.prisma.serviceRequest.findMany({
      where,
      take: limit,
      skip: offset,
      include: {
        user: true,
        approval: true,
        booking: true,
        _count: {
          select: { auditEvents: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRequestTimeline(
    requestId: string,
    user?: {
      userId: string;
      institutionId: string;
      role: string;
    },
  ) {
    const request = await this.prisma.serviceRequest.findFirst({
      where: {
        OR: [{ id: requestId }, { externalId: requestId }],
      },
      include: {
        user: true,
        approval: {
          include: { approver: true },
        },
        booking: true,
      },
    });

    if (!request) {
      throw new NotFoundException(
        `Service request with ID "${requestId}" not found.`,
      );
    }

    // Role-based access control:
    // If authenticated user is a STUDENT, they can ONLY view their own requests.
    if (user && user.role === 'STUDENT' && request.userId !== user.userId) {
      throw new ForbiddenException(
        'You do not have permission to view this request timeline.',
      );
    }

    // Institution boundary check
    if (
      user &&
      user.institutionId &&
      request.institutionId !== user.institutionId
    ) {
      throw new ForbiddenException(
        'You do not have permission to view this request timeline.',
      );
    }

    const events = await this.prisma.auditEvent.findMany({
      where: { requestId: request.id },
      include: { actor: true },
      orderBy: { createdAt: 'asc' },
    });

    // Sanitize user object to never expose passwordHash
    const sanitizedUser = request.user
      ? {
          id: request.user.id,
          institutionId: request.user.institutionId,
          departmentId: request.user.departmentId,
          name: request.user.name,
          email: request.user.email,
          role: request.user.role,
          createdAt: request.user.createdAt,
          updatedAt: request.user.updatedAt,
        }
      : null;

    // Sanitize approval approver object to never expose passwordHash
    const sanitizedApproval = request.approval
      ? {
          ...request.approval,
          approver: request.approval.approver
            ? {
                id: request.approval.approver.id,
                institutionId: request.approval.approver.institutionId,
                departmentId: request.approval.approver.departmentId,
                name: request.approval.approver.name,
                email: request.approval.approver.email,
                role: request.approval.approver.role,
                createdAt: request.approval.approver.createdAt,
                updatedAt: request.approval.approver.updatedAt,
              }
            : null,
        }
      : null;

    const sanitizedRequest = {
      ...request,
      user: sanitizedUser,
      approval: sanitizedApproval,
    };

    return {
      request: sanitizedRequest,
      totalEvents: events.length,
      timeline: events.map((ev, index) => ({
        step: index + 1,
        id: ev.id,
        eventType: ev.eventType,
        actor: ev.actor
          ? {
              id: ev.actor.id,
              name: ev.actor.name,
              email: ev.actor.email,
              role: ev.actor.role,
            }
          : null,
        metadata: ev.metadata,
        timestamp: ev.createdAt,
      })),
    };
  }
}
