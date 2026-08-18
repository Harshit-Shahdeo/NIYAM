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
const agent_reason_response_dto_1 = require("./dto/agent-reason-response.dto");
let AgentService = class AgentService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async reason(request) {
        let response;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('http://localhost:8000/agent/reason', request));
        }
        catch (error) {
            console.error('FastAPI request failed:', error);
            throw new common_1.ServiceUnavailableException('AI reasoning service unavailable');
        }
        const aiResponse = (0, class_transformer_1.plainToInstance)(agent_reason_response_dto_1.AgentReasonResponseDto, response.data);
        const errors = await (0, class_validator_1.validate)(aiResponse, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        if (errors.length > 0) {
            console.error('Invalid AI response:', errors);
            throw new common_1.InternalServerErrorException('AI reasoning service returned an invalid response');
        }
        return aiResponse;
    }
};
exports.AgentService = AgentService;
exports.AgentService = AgentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AgentService);
//# sourceMappingURL=agent.service.js.map