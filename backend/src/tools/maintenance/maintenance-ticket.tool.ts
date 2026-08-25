import { BadRequestException, Injectable } from '@nestjs/common';

import { InstitutionalTool } from '../institutional-tools';
import { ToolExecutionContext } from '../tool-execution-context';
import { validateToolArguments } from '../tool-argument-validator';
import { AuditService } from '../../audit/audit.service';
import { MaintenanceTicketArgsDto } from './dto/maintenance-ticket-args.dto';

@Injectable()
export class MaintenanceTicketTool extends InstitutionalTool {
  readonly name = 'MaintenanceTicketTool';

  constructor(private readonly auditService: AuditService) {
    super();
  }

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

    const ticketId = `TICK-${Date.now().toString().slice(-6)}`;
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
      assignedTeam: `${args.category} Facilities Support Team`,
      createdAt: new Date().toISOString(),
    };

    return {
      ticket,
      message: `Maintenance ticket ${ticketId} created successfully for ${args.location}.`,
    };
  }
}
