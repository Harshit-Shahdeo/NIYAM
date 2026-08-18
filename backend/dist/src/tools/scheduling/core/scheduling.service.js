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
    async checkAvailability(resourceId, date, start, end) {
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
    async createBooking(input) {
        this.validateTimeRange(input.start, input.end);
        const available = await this.checkAvailability(input.resourceId, input.date, input.start, input.end);
        if (!available) {
            throw new common_1.BadRequestException('Requested time slot is already booked');
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
        if (user.institutionId !== resource.institutionId) {
            throw new common_1.BadRequestException('User and resource belong to different institutions');
        }
        const booking = await this.prisma.booking.create({
            data: {
                institutionId: user.institutionId,
                resourceId: input.resourceId,
                userId: input.userId,
                requestId: input.requestId,
                date: this.toDateOnly(input.date),
                startTime: this.toDateTime(input.date, input.start),
                endTime: this.toDateTime(input.date, input.end),
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
    async getBookings() {
        const bookings = await this.prisma.booking.findMany({
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
    toDateOnly(date) {
        return new Date(`${date}T00:00:00.000Z`);
    }
    toDateTime(date, time) {
        return new Date(`${date}T${time}:00.000Z`);
    }
    formatDate(date) {
        return date.toISOString().slice(0, 10);
    }
    formatTime(date) {
        return date.toISOString().slice(11, 16);
    }
    validateTimeRange(start, end) {
        if (start >= end) {
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