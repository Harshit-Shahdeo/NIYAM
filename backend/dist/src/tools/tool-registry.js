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
exports.ToolRegistry = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const institutional_tools_1 = require("./institutional-tools");
let ToolRegistry = class ToolRegistry {
    discoveryService;
    tools = new Map();
    constructor(discoveryService) {
        this.discoveryService = discoveryService;
    }
    onModuleInit() {
        const providers = this.discoveryService.getProviders();
        for (const wrapper of providers) {
            const instance = wrapper.instance;
            if (!(instance instanceof institutional_tools_1.InstitutionalTool)) {
                continue;
            }
            this.register(instance);
        }
    }
    register(tool) {
        if (this.tools.has(tool.name)) {
            throw new Error(`Institutional tool already registered: ${tool.name}`);
        }
        this.tools.set(tool.name, tool);
    }
    get(toolName) {
        const tool = this.tools.get(toolName);
        if (!tool) {
            throw new Error(`Tool not registered: ${toolName}`);
        }
        return tool;
    }
    async execute(toolName, operation, arguments_, context) {
        const tool = this.get(toolName);
        return tool.execute(operation, arguments_, context);
    }
};
exports.ToolRegistry = ToolRegistry;
exports.ToolRegistry = ToolRegistry = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.DiscoveryService])
], ToolRegistry);
//# sourceMappingURL=tool-registry.js.map