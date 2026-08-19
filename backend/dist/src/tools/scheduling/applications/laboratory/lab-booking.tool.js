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
exports.LabBookingTool = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const institutional_tools_1 = require("../../../institutional-tools");
const tool_argument_validator_1 = require("../../../tool-argument-validator");
const audit_service_1 = require("../../../../audit/audit.service");
const scheduling_service_1 = require("../../core/scheduling.service");
const lab_booking_args_dto_1 = require("./dto/lab-booking-args.dto");
let LabBookingTool = class LabBookingTool extends institutional_tools_1.InstitutionalTool {
    prisma;
    schedulingService;
    auditService;
    name = 'LabBookingTool';
    constructor(prisma, schedulingService, auditService) {
        super();
        this.prisma = prisma;
        this.schedulingService = schedulingService;
        this.auditService = auditService;
    }
    async execute(operation, arguments_, context) {
        if (operation !== 'book') {
            throw new common_1.BadRequestException(`Unsupported laboratory booking operation: ${operation}`);
        }
        const args = await (0, tool_argument_validator_1.validateToolArguments)(lab_booking_args_dto_1.LabBookingArgsDto, arguments_);
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
            throw new common_1.BadRequestException(`Laboratory not found: ${args.resource}`);
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
            purpose: args.purpose,
        });
        await this.auditService.record(context.institutionId, context.requestId, 'BOOKING_CREATED', {
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
        });
        return booking;
    }
};
exports.LabBookingTool = LabBookingTool;
exports.LabBookingTool = LabBookingTool = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        scheduling_service_1.SchedulingService,
        audit_service_1.AuditService])
], LabBookingTool);
//# sourceMappingURL=lab-booking.tool.js.map