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
exports.AgentReasonRequestDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const agent_user_dto_1 = require("./agent-user.dto");
const conversation_messages_dto_1 = require("./conversation-messages.dto");
class AgentReasonRequestDto {
    request_id;
    message;
    user;
    conversation;
}
exports.AgentReasonRequestDto = AgentReasonRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AgentReasonRequestDto.prototype, "request_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AgentReasonRequestDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => agent_user_dto_1.AgentUserDto),
    __metadata("design:type", agent_user_dto_1.AgentUserDto)
], AgentReasonRequestDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => conversation_messages_dto_1.ConversationMessageDto),
    __metadata("design:type", Array)
], AgentReasonRequestDto.prototype, "conversation", void 0);
//# sourceMappingURL=agent-reason-request.dto.js.map