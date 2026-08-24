import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../database/prisma.service';

import { InstitutionalTool } from '../../../institutional-tools';
import { ToolExecutionContext } from '../../../tool-execution-context';
import { validateToolArguments } from '../../../tool-argument-validator';
import { AuditService } from '../../../../audit/audit.service';
import { SchedulingService } from '../../core/scheduling.service';
import { LabBookingArgsDto } from './dto/lab-booking-args.dto';

@Injectable()
export class LabBookingTool extends InstitutionalTool {
  readonly name = 'LabBookingTool';

  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulingService: SchedulingService,
    private readonly auditService: AuditService,
  ) {
    super();
  }

  async execute(
    operation: string,
    arguments_: Record<string, unknown>,
    context: ToolExecutionContext,
  ): Promise<unknown> {
    if (operation !== 'book') {
      throw new BadRequestException(
        `Unsupported laboratory booking operation: ${operation}`,
      );
    }

    const args = await validateToolArguments(LabBookingArgsDto, arguments_);

    const resource = await this.prisma.resource.findFirst({
      where: {
        institutionId: context.institutionId,
        name: args.resource,
        type: 'LAB',
      },
      select: {
        id: true,
      },
    });

    if (!resource) {
      throw new BadRequestException(`Laboratory not found: ${args.resource}`);
    }

    const date = new Date(`${args.date}T00:00:00.000Z`);

    const startTime = new Date(`${args.date}T${args.start}:00.000Z`);

    const endTime = new Date(`${args.date}T${args.end}:00.000Z`);

    const booking = await this.schedulingService.createBooking({
      requestId: context.requestId,
      resourceId: resource.id,
      userId: context.userId,
      date,
      startTime,
      endTime,
      purpose: args.purpose ?? null,
    });

    await this.auditService.record(
      context.institutionId,
      context.requestId,
      'BOOKING_CREATED',
      {
        actorId: context.userId,
        metadata: {
          bookingId: booking.id,
          resourceId: booking.resourceId,
          userId: booking.userId,
          requestId: booking.requestId,
          date: booking.date.toISOString(),
          startTime: booking.startTime.toISOString(),
          endTime: booking.endTime.toISOString(),
          purpose: booking.purpose,
        },
      },
    );

    return booking;
  }
}
