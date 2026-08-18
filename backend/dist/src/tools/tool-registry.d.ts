import { OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { InstitutionalTool } from './institutional-tools';
import { ToolExecutionContext } from './tool-execution-context';
export declare class ToolRegistry implements OnModuleInit {
    private readonly discoveryService;
    private readonly tools;
    constructor(discoveryService: DiscoveryService);
    onModuleInit(): void;
    register(tool: InstitutionalTool): void;
    get(toolName: string): InstitutionalTool;
    execute(toolName: string, operation: string, arguments_: Record<string, unknown>, context: ToolExecutionContext): Promise<unknown>;
}
