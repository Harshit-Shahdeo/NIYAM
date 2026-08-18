import {
    Injectable,
    OnModuleInit,
} from '@nestjs/common';

import {
    DiscoveryService,
} from '@nestjs/core';

import { InstitutionalTool } from './institutional-tools';
import { ToolExecutionContext } from './tool-execution-context';

@Injectable()
export class ToolRegistry implements OnModuleInit {
    private readonly tools = new Map<
        string,
        InstitutionalTool
    >();

    constructor(
        private readonly discoveryService: DiscoveryService,
    ) { }

    onModuleInit(): void {
        const providers =
            this.discoveryService.getProviders();

        for (const wrapper of providers) {
            const instance = wrapper.instance;

            if (!(instance instanceof InstitutionalTool)) {
                continue;
            }

            this.register(instance);
        }
    }

    register(tool: InstitutionalTool): void {
        if (this.tools.has(tool.name)) {
            throw new Error(
                `Institutional tool already registered: ${tool.name}`,
            );
        }

        this.tools.set(tool.name, tool);
    }

    get(toolName: string): InstitutionalTool {
        const tool = this.tools.get(toolName);

        if (!tool) {
            throw new Error(
                `Tool not registered: ${toolName}`,
            );
        }

        return tool;
    }

    async execute(
        toolName: string,
        operation: string,
        arguments_: Record<string, unknown>,
        context: ToolExecutionContext,
    ): Promise<unknown> {
        const tool = this.get(toolName);

        return tool.execute(
            operation,
            arguments_,
            context,
        );
    }
}