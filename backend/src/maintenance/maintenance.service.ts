import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AuthenticatedUser } from '../auth/types/authenticated-user.interface';

@Injectable()
export class MaintenanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyTickets(user: AuthenticatedUser) {
    const serviceRequests = await this.prisma.serviceRequest.findMany({
      where: {
        userId: user.userId,
        institutionId: user.institutionId,
        intent: 'MAINTENANCE_REQUEST',
      },
      include: {
        approval: true,
        auditEvents: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const tickets = serviceRequests.map((req) => {
      const executedEvent = req.auditEvents.find(
        (ev) => ev.eventType === 'ACTION_EXECUTED',
      );
      const executedMeta =
        (executedEvent?.metadata as Record<string, unknown>) || {};
      const executedTicket =
        (executedMeta.ticket as Record<string, unknown>) || {};

      const proposedEvent = req.auditEvents.find(
        (ev) => ev.eventType === 'ACTION_PROPOSED',
      );
      const proposedMeta =
        (proposedEvent?.metadata as Record<string, unknown>) || {};
      const proposedArgs =
        (proposedMeta.arguments as Record<string, unknown>) || {};

      const ticketId = (executedTicket.ticketId as string) || null;
      const status =
        (executedTicket.status as string) ||
        (req.status === 'COMPLETED' ? 'OPEN' : req.status);
      const location =
        (executedTicket.location as string) ||
        (proposedArgs.location as string) ||
        'General Campus Facility';
      const category =
        (executedTicket.category as string) ||
        (proposedArgs.category as string) ||
        'GENERAL';
      const description =
        (executedTicket.description as string) ||
        (proposedArgs.description as string) ||
        req.message;
      const urgency =
        (executedTicket.urgency as string) ||
        (proposedArgs.urgency as string) ||
        'MEDIUM';
      const slaHours =
        (executedTicket.slaHours as number) ||
        (urgency === 'EMERGENCY'
          ? 2
          : urgency === 'HIGH'
            ? 4
            : urgency === 'LOW'
              ? 48
              : 24);
      const assignedTeam =
        (executedTicket.assignedTeam as string) ||
        `${category} Facilities Support Team`;
      const createdAt =
        (executedTicket.createdAt as string) || req.createdAt.toISOString();

      return {
        ticketId,
        requestId: req.id,
        externalId: req.externalId,
        requestStatus: req.status,
        approvalStatus: req.approval?.status ?? null,
        location,
        category,
        description,
        urgency,
        slaHours,
        assignedTeam,
        createdAt,
      };
    });

    return { tickets };
  }
}
