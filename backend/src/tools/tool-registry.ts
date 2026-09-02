import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { InstitutionalTool, ToolMetadata } from './institutional-tools';
import { ToolExecutionContext } from './tool-execution-context';

@Injectable()
export class ToolRegistry implements OnModuleInit {
  private readonly tools = new Map<string, InstitutionalTool>();

  constructor(private readonly discoveryService: DiscoveryService) {}

  onModuleInit(): void {
    const providers = this.discoveryService.getProviders();

    for (const wrapper of providers) {
      const instance = wrapper.instance;

      if (!(instance instanceof InstitutionalTool)) {
        continue;
      }

      this.register(instance);
    }
    console.log('Registered institutional tools:', [...this.tools.keys()]);
  }

  register(tool: InstitutionalTool): void {
    if (this.tools.has(tool.name)) {
      throw new Error(`Institutional tool already registered: ${tool.name}`);
    }

    this.tools.set(tool.name, tool);
  }

  get(toolName: string): InstitutionalTool {
    const tool = this.tools.get(toolName);

    if (!tool) {
      throw new Error(`Tool not registered: ${toolName}`);
    }

    return tool;
  }

  getAllMetadata(): ToolMetadata[] {
    const metadataList: ToolMetadata[] = [];

    for (const tool of this.tools.values()) {
      if (typeof tool.getMetadata === 'function') {
        metadataList.push(tool.getMetadata());
      } else {
        metadataList.push({
          name: tool.name,
          description: `Institutional tool ${tool.name}`,
          operations: [],
        });
      }
    }

    return metadataList;
  }

  async execute(
    toolName: string,
    operation: string,
    arguments_: Record<string, unknown>,
    context: ToolExecutionContext,
  ): Promise<unknown> {
    const tool = this.get(toolName);

    return tool.execute(operation, arguments_, context);
  }
}
