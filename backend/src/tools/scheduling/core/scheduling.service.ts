import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import {
  Booking,
  CreateBookingInput,
} from './booking.types';

@Injectable()
export class SchedulingService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async checkAvailability(
    resourceId: string,
    date: string,
    start: string,
    end: string,
  ): Promise<boolean> {
    this.validateTimeRange(start, end);

    const startTime = this.toDateTime(date, start);
    const endTime = this.toDateTime(date, end);

    const conflict = await this.prisma.booking.findFirst({
      where: {
        resourceId,
        date: this.toDateOnly(date),
        status: {
          not: 'CANCELLED',
        },
        startTime: {
          lt: endTime,
        },
        endTime: {
          gt: startTime,
        },
      },
    });

    return conflict === null;
  }

  async createBooking(
    input: CreateBookingInput,
  ): Promise<Booking> {
    this.validateTimeRange(
      input.start,
      input.end,
    );

    const available = await this.checkAvailability(
      input.resourceId,
      input.date,
      input.start,
      input.end,
    );

    if (!available) {
      throw new BadRequestException(
        'Requested time slot is already booked',
      );
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
      throw new BadRequestException(
        'User not found',
      );
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
      throw new BadRequestException(
        'Resource not found',
      );
    }

    if (
      user.institutionId !== resource.institutionId
    ) {
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
        date: this.toDateOnly(input.date),
        startTime: this.toDateTime(
          input.date,
          input.start,
        ),
        endTime: this.toDateTime(
          input.date,
          input.end,
        ),
        purpose: input.purpose,
      },
    });

    return {
      id: booking.id,
      requestId: booking.requestId,
      resourceId: booking.resourceId,
      userId: booking.userId,
      date: input.date,
      start: input.start,
      end: input.end,
      purpose: booking.purpose ?? undefined,
    };
  }

  async getBookings(): Promise<Booking[]> {
    const bookings =
      await this.prisma.booking.findMany({
        where: {
          status: {
            not: 'CANCELLED',
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    return bookings.map((booking) => ({
      id: booking.id,
      requestId: booking.requestId,
      resourceId: booking.resourceId,
      userId: booking.userId,
      date: this.formatDate(booking.date),
      start: this.formatTime(booking.startTime),
      end: this.formatTime(booking.endTime),
      purpose: booking.purpose ?? undefined,
    }));
  }

  private toDateOnly(date: string): Date {
    return new Date(`${date}T00:00:00.000Z`);
  }

  private toDateTime(
    date: string,
    time: string,
  ): Date {
    return new Date(`${date}T${time}:00.000Z`);
  }

  private formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  private formatTime(date: Date): string {
    return date.toISOString().slice(11, 16);
  }

  private validateTimeRange(
    start: string,
    end: string,
  ): void {
    if (start >= end) {
      throw new BadRequestException(
        'Start time must be before end time',
      );
    }
  }
}