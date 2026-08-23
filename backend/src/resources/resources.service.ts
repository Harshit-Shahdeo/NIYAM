import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ResourcesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(institutionId?: string) {
    const where: any = {};
    if (institutionId) {
      where.institutionId = institutionId;
    }
    return this.prisma.resource.findMany({
      where,
    });
  }

  async findOne(id: string) {
    const resource = await this.prisma.resource.findUnique({
      where: { id },
    });

    if (!resource) {
      throw new NotFoundException(`Resource with ID "${id}" not found.`);
    }

    return resource;
  }

  async getAvailability(resourceId: string, dateStr: string) {
    const resource = await this.findOne(resourceId);

    const startOfDay = new Date(`${dateStr}T00:00:00Z`);
    const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);

    const bookings = await this.prisma.booking.findMany({
      where: {
        resourceId,
        status: 'CONFIRMED',
        startTime: { gte: startOfDay, lte: endOfDay },
      },
      include: {
        user: true,
      },
      orderBy: { startTime: 'asc' },
    });

    const operationalStart = new Date(`${dateStr}T08:00:00Z`);
    const operationalEnd = new Date(`${dateStr}T20:00:00Z`);

    const availableIntervals: { start: string; end: string }[] = [];
    let currentCursor = operationalStart;

    for (const booking of bookings) {
      if (booking.startTime > currentCursor) {
        availableIntervals.push({
          start: currentCursor.toISOString(),
          end: booking.startTime.toISOString(),
        });
      }
      if (booking.endTime > currentCursor) {
        currentCursor = booking.endTime;
      }
    }

    if (currentCursor < operationalEnd) {
      availableIntervals.push({
        start: currentCursor.toISOString(),
        end: operationalEnd.toISOString(),
      });
    }

    return {
      resource: {
        id: resource.id,
        name: resource.name,
        type: resource.type,
        location: resource.location,
        capacity: resource.capacity,
      },
      date: dateStr,
      operationalHours: {
        start: '08:00:00Z',
        end: '20:00:00Z',
      },
      totalBookings: bookings.length,
      bookedSlots: bookings.map((b) => ({
        id: b.id,
        startTime: b.startTime,
        endTime: b.endTime,
        purpose: b.purpose,
        user: {
          id: b.user.id,
          name: b.user.name,
          email: b.user.email,
          role: b.user.role,
        },
      })),
      availableIntervals,
    };
  }
}
