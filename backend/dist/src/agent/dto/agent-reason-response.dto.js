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
exports.AgentReasonResponseDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const proposed_action_dto_1 = require("./proposed-action.dto");
const agent_source_dto_1 = require("./agent-source.dto");
class AgentReasonResponseDto {
    intent;
    confidence_score;
    uncertainty_detected;
    policy_conflict_detected;
    requires_approval;
    decision;
    proposed_action;
    sources;
    reason;
}
exports.AgentReasonResponseDto = AgentReasonResponseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AgentReasonResponseDto.prototype, "intent", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AgentReasonResponseDto.prototype, "confidence_score", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AgentReasonResponseDto.prototype, "uncertainty_detected", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AgentReasonResponseDto.prototype, "policy_conflict_detected", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AgentReasonResponseDto.prototype, "requires_approval", void 0);
__decorate([
    (0, class_validator_1.IsIn)([
        'ALLOW',
        'REQUIRE_HUMAN_APPROVAL',
        'REJECT',
    ]),
    __metadata("design:type", String)
], AgentReasonResponseDto.prototype, "decision", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => proposed_action_dto_1.ProposedActionDto),
    __metadata("design:type", Object)
], AgentReasonResponseDto.prototype, "proposed_action", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => agent_source_dto_1.AgentSourceDto),
    __metadata("design:type", Array)
], AgentReasonResponseDto.prototype, "sources", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AgentReasonResponseDto.prototype, "reason", void 0);
//# sourceMappingURL=agent-reason-response.dto.js.map