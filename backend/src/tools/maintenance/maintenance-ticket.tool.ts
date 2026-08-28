import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { InstitutionalTool } from '../institutional-tools';
import { ToolExecutionContext } from '../tool-execution-context';
import { validateToolArguments } from '../tool-argument-validator';
import { MaintenanceTicketArgsDto } from './dto/maintenance-ticket-args.dto';

@Injectable()
export class MaintenanceTicketTool extends InstitutionalTool {
  readonly name = 'MaintenanceTicketTool';

  async execute(
    operation: string,
    arguments_: Record<string, unknown>,
    context: ToolExecutionContext,
  ): Promise<unknown> {
    if (operation !== 'create') {
      throw new BadRequestException(
        `Unsupported maintenance operation: ${operation}`,
      );
    }

    const args = await validateToolArguments(
      MaintenanceTicketArgsDto,
      arguments_,
    );

    const ticketId =
      `TICK-${randomUUID().split('-')[0].toUpperCase()}`;

    const urgency = args.urgency || 'MEDIUM';

    const slaHours =
      urgency === 'EMERGENCY'
        ? 2
        : urgency === 'HIGH'
          ? 4
          : urgency === 'LOW'
            ? 48
            : 24;

    const ticket = {
      ticketId,
      status: 'OPEN',
      location: args.location,
      category: args.category,
      description: args.description,
      urgency,
      slaHours,
      assignedTeam:
        `${args.category} Facilities Support Team`,
      requestId: context.requestId,
      createdAt: new Date().toISOString(),
    };

    return {
      ticket,
      message:
        `Maintenance ticket ${ticketId} was created successfully ` +
        `for ${args.location}. The issue has been assigned to the ` +
        `${ticket.assignedTeam}.`,
    };
  }
}