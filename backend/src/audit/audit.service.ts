import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getRequestTimeline(requestId: string) {
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

    const events = await this.prisma.auditEvent.findMany({
      where: { requestId: request.id },
      include: { actor: true },
      orderBy: { createdAt: 'asc' },
    });

    return {
      request,
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
