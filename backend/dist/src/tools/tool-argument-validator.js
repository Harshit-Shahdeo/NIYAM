"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToolArguments = validateToolArguments;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
async function validateToolArguments(dtoClass, arguments_) {
    const dto = (0, class_transformer_1.plainToInstance)(dtoClass, arguments_);
    const errors = await (0, class_validator_1.validate)(dto);
    if (errors.length > 0) {
        throw new common_1.BadRequestException(errors);
    }
    return dto;
}
//# sourceMappingURL=tool-argument-validator.js.map