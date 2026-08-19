"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
let SchedulingService = class SchedulingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findNextAvailableSlot(resourceId, requestedStart, requestedEnd) {
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
        const durationMs = requestedEnd.getTime() -
            requestedStart.getTime();
        let currentStart = requestedStart;
        for (const booking of bookings) {
            const currentEnd = new Date(currentStart.getTime() + durationMs);
            if (currentEnd.getTime() <=
                booking.startTime.getTime()) {
                return {
                    exactMatch: currentStart.getTime() ===
                        requestedStart.getTime(),
                    scheduledStart: currentStart,
                    scheduledEnd: currentEnd,
                };
            }
            if (currentStart.getTime() <
                booking.endTime.getTime() &&
                currentEnd.getTime() >
                    booking.startTime.getTime()) {
                currentStart = booking.endTime;
            }
        }
        return {
            exactMatch: currentStart.getTime() ===
                requestedStart.getTime(),
            scheduledStart: currentStart,
            scheduledEnd: new Date(currentStart.getTime() + durationMs),
        };
    }
    async checkAvailability(resourceId, requestedStart, requestedEnd) {
        const slot = await this.findNextAvailableSlot(resourceId, requestedStart, requestedEnd);
        return slot.exactMatch;
    }
    async createBooking(input) {
        this.validateTimeRange(input.startTime, input.endTime);
        const slot = await this.findNextAvailableSlot(input.resourceId, input.startTime, input.endTime);
        if (!slot.exactMatch) {
            throw new common_1.BadRequestException({
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
            throw new common_1.BadRequestException('User not found');
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
            throw new common_1.BadRequestException('Resource not found');
        }
        if (user.institutionId !==
            resource.institutionId) {
            throw new common_1.BadRequestException('User and resource belong to different institutions');
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
    async getBookings() {
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
    validateTimeRange(startTime, endTime) {
        if (startTime.getTime() >=
            endTime.getTime()) {
            throw new common_1.BadRequestException('Start time must be before end time');
        }
    }
};
exports.SchedulingService = SchedulingService;
exports.SchedulingService = SchedulingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SchedulingService);
//# sourceMappingURL=scheduling.service.js.map