import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';

import { AvailableSlot, Booking, CreateBookingInput } from './booking.types';

@Injectable()
export class SchedulingService {
  constructor(private readonly prisma: PrismaService) {}

  async findNextAvailableSlot(
    resourceId: string,
    requestedStart: Date,
    requestedEnd: Date,
  ): Promise<AvailableSlot> {
    this.validateTimeRange(requestedStart, requestedEnd);

    const bookings = await this.prisma.booking.findMany({
      where: {
        resourceId,
        status: {
          not: 'CANCELLED',
        },
        endTime: {
          gte: requestedStart,
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    const durationMs = requestedEnd.getTime() - requestedStart.getTime();

    let currentStart = requestedStart;

    for (const booking of bookings) {
      const currentEnd = new Date(currentStart.getTime() + durationMs);

      // The requested duration fits before this booking.
      if (currentEnd.getTime() <= booking.startTime.getTime()) {
        return {
          exactMatch: currentStart.getTime() === requestedStart.getTime(),
          scheduledStart: currentStart,
          scheduledEnd: currentEnd,
        };
      }

      // The candidate overlaps this booking.
      if (
        currentStart.getTime() < booking.endTime.getTime() &&
        currentEnd.getTime() > booking.startTime.getTime()
      ) {
        currentStart = booking.endTime;
      }
    }

    return {
      exactMatch: currentStart.getTime() === requestedStart.getTime(),
      scheduledStart: currentStart,
      scheduledEnd: new Date(currentStart.getTime() + durationMs),
    };
  }

  async checkAvailability(
    resourceId: string,
    requestedStart: Date,
    requestedEnd: Date,
  ): Promise<boolean> {
    const slot = await this.findNextAvailableSlot(
      resourceId,
      requestedStart,
      requestedEnd,
    );

    return slot.exactMatch;
  }

  async createBooking(input: CreateBookingInput): Promise<Booking> {
    this.validateTimeRange(input.startTime, input.endTime);

    const slot = await this.findNextAvailableSlot(
      input.resourceId,
      input.startTime,
      input.endTime,
    );

    if (!slot.exactMatch) {
      throw new BadRequestException({
        message: 'Requested time slot is unavailable',
        nextAvailable: {
          start: slot.scheduledStart,
          end: slot.scheduledEnd,
        },
      });
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: input.userId,
      },
      select: {
        institutionId: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const resource = await this.prisma.resource.findUnique({
      where: {
        id: input.resourceId,
      },
      select: {
        institutionId: true,
      },
    });

    if (!resource) {
      throw new BadRequestException('Resource not found');
    }

    if (user.institutionId !== resource.institutionId) {
      throw new BadRequestException(
        'User and resource belong to different institutions',
      );
    }

    const booking = await this.prisma.booking.create({
      data: {
        institutionId: user.institutionId,
        resourceId: input.resourceId,
        userId: input.userId,
        requestId: input.requestId,
        date: input.date,
        startTime: input.startTime,
        endTime: input.endTime,
        purpose: input.purpose,
      },
    });

    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: {
        status: {
          not: 'CANCELLED',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private validateTimeRange(startTime: Date, endTime: Date): void {
    if (startTime.getTime() >= endTime.getTime()) {
      throw new BadRequestException('Start time must be before end time');
    }
  }
}
