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
exports.AgentService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const prisma_service_1 = require("../database/prisma.service");
const audit_service_1 = require("../audit/audit.service");
const tool_registry_1 = require("../tools/tool-registry");
const agent_reason_response_dto_1 = require("./dto/agent-reason-response.dto");
let AgentService = class AgentService {
    httpService;
    prisma;
    toolRegistry;
    auditService;
    constructor(httpService, prisma, toolRegistry, auditService) {
        this.httpService = httpService;
        this.prisma = prisma;
        this.toolRegistry = toolRegistry;
        this.auditService = auditService;
    }
    async reason(request) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: request.user.id,
            },
            select: {
                id: true,
                institutionId: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const serviceRequest = await this.prisma.serviceRequest.create({
            data: {
                externalId: request.request_id,
                institutionId: user.institutionId,
                userId: user.id,
                message: request.message,
                status: 'PROCESSING',
            },
        });
        await this.auditService.record(user.institutionId, serviceRequest.id, 'REQUEST_RECEIVED', {
            actorId: user.id,
            metadata: {
                externalId: request.request_id,
            },
        });
        await this.auditService.record(user.institutionId, serviceRequest.id, 'AI_REASONING_STARTED');
        let response;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('http://localhost:8000/agent/reason', request));
        }
        catch (error) {
            console.error('FastAPI request failed:', error);
            await this.prisma.serviceRequest.update({
                where: {
                    id: serviceRequest.id,
                },
                data: {
                    status: 'FAILED',
                },
            });
            await this.auditService.record(user.institutionId, serviceRequest.id, 'REQUEST_FAILED', {
                metadata: {
                    reason: 'AI reasoning service unavailable',
                },
            });
            throw new common_1.ServiceUnavailableException('AI reasoning service unavailable');
        }
        const aiResponse = (0, class_transformer_1.plainToInstance)(agent_reason_response_dto_1.AgentReasonResponseDto, response.data);
        const errors = await (0, class_validator_1.validate)(aiResponse, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        if (errors.length > 0) {
            console.error('Invalid AI response:', errors);
            await this.prisma.serviceRequest.update({
                where: {
                    id: serviceRequest.id,
                },
                data: {
                    status: 'FAILED',
                },
            });
            await this.auditService.record(user.institutionId, serviceRequest.id, 'REQUEST_FAILED', {
                metadata: {
                    reason: 'Invalid AI response',
                },
            });
            throw new common_1.InternalServerErrorException('AI reasoning service returned an invalid response');
        }
        await this.auditService.record(user.institutionId, serviceRequest.id, 'AI_REASONING_COMPLETED', {
            metadata: {
                intent: aiResponse.intent,
                decision: aiResponse.decision,
                confidenceScore: aiResponse.confidence_score,
                uncertaintyDetected: aiResponse.uncertainty_detected,
                policyConflictDetected: aiResponse.policy_conflict_detected,
            },
        });
        await this.prisma.serviceRequest.update({
            where: {
                id: serviceRequest.id,
            },
            data: {
                intent: aiResponse.intent,
            },
        });
        if (aiResponse.decision === 'REJECT') {
            await this.prisma.serviceRequest.update({
                where: {
                    id: serviceRequest.id,
                },
                data: {
                    status: 'REJECTED',
                },
            });
            return aiResponse;
        }
        if (aiResponse.decision ===
            'REQUIRE_HUMAN_APPROVAL') {
            if (aiResponse.proposed_action) {
                await this.auditService.record(user.institutionId, serviceRequest.id, 'ACTION_PROPOSED', {
                    metadata: {
                        tool: aiResponse.proposed_action.tool,
                        operation: aiResponse.proposed_action.operation,
                        arguments: aiResponse.proposed_action.arguments,
                    },
                });
            }
            await this.prisma.approval.create({
                data: {
                    institutionId: user.institutionId,
                    requestId: serviceRequest.id,
                    status: 'PENDING',
                    reason: aiResponse.reason,
                },
            });
            await this.auditService.record(user.institutionId, serviceRequest.id, 'APPROVAL_REQUESTED', {
                metadata: {
                    reason: aiResponse.reason,
                },
            });
            await this.prisma.serviceRequest.update({
                where: {
                    id: serviceRequest.id,
                },
                data: {
                    status: 'WAITING_FOR_APPROVAL',
                },
            });
            return aiResponse;
        }
        if (!aiResponse.proposed_action) {
            await this.prisma.serviceRequest.update({
                where: {
                    id: serviceRequest.id,
                },
                data: {
                    status: 'FAILED',
                },
            });
            await this.auditService.record(user.institutionId, serviceRequest.id, 'REQUEST_FAILED', {
                metadata: {
                    reason: 'AI allowed the request but did not provide an action',
                },
            });
            throw new common_1.InternalServerErrorException('AI allowed the request but did not provide an action');
        }
        await this.auditService.record(user.institutionId, serviceRequest.id, 'ACTION_PROPOSED', {
            metadata: {
                tool: aiResponse.proposed_action.tool,
                operation: aiResponse.proposed_action.operation,
                arguments: aiResponse.proposed_action.arguments,
            },
        });
        const context = {
            userId: user.id,
            institutionId: user.institutionId,
            requestId: serviceRequest.id,
        };
        try {
            await this.toolRegistry.execute(aiResponse.proposed_action.tool, aiResponse.proposed_action.operation, aiResponse.proposed_action.arguments, context);
        }
        catch (error) {
            console.error('Institutional tool execution failed:', error);
            await this.prisma.serviceRequest.update({
                where: {
                    id: serviceRequest.id,
                },
                data: {
                    status: 'FAILED',
                },
            });
            await this.auditService.record(user.institutionId, serviceRequest.id, 'REQUEST_FAILED', {
                metadata: {
                    reason: 'Institutional tool execution failed',
                },
            });
            throw error;
        }
        await this.auditService.record(user.institutionId, serviceRequest.id, 'ACTION_EXECUTED', {
            metadata: {
                tool: aiResponse.proposed_action.tool,
                operation: aiResponse.proposed_action.operation,
            },
        });
        await this.prisma.serviceRequest.update({
            where: {
                id: serviceRequest.id,
            },
            data: {
                status: 'COMPLETED',
            },
        });
        await this.auditService.record(user.institutionId, serviceRequest.id, 'REQUEST_COMPLETED');
        return aiResponse;
    }
};
exports.AgentService = AgentService;
exports.AgentService = AgentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        prisma_service_1.PrismaService,
        tool_registry_1.ToolRegistry,
        audit_service_1.AuditService])
], AgentService);
//# sourceMappingURL=agent.service.js.map