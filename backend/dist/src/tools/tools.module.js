"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const database_module_1 = require("../database/database.module");
const audit_module_1 = require("../audit/audit.module");
const lab_booking_tool_1 = require("./scheduling/applications/laboratory/lab-booking.tool");
const scheduling_service_1 = require("./scheduling/core/scheduling.service");
const tool_registry_1 = require("./tool-registry");
let ToolsModule = class ToolsModule {
};
exports.ToolsModule = ToolsModule;
exports.ToolsModule = ToolsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            core_1.DiscoveryModule,
            audit_module_1.AuditModule,
        ],
        providers: [
            tool_registry_1.ToolRegistry,
            scheduling_service_1.SchedulingService,
            lab_booking_tool_1.LabBookingTool,
        ],
        exports: [
            tool_registry_1.ToolRegistry,
            scheduling_service_1.SchedulingService,
        ],
    })
], ToolsModule);
//# sourceMappingURL=tools.module.js.map