import { ToolExecutionContext } from './tool-execution-context';

export interface ToolOperationMetadata {
  operation: string;
  description: string;
  requiredRole?: string[];
  parameters?: Record<
    string,
    { type: string; required: boolean; description: string }
  >;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  auditEventName: string;
}

export interface ToolMetadata {
  name: string;
  description: string;
  operations: ToolOperationMetadata[];
}

export abstract class InstitutionalTool {
  abstract readonly name: string;

  abstract execute(
    operation: string,
    arguments_: Record<string, unknown>,
    context: ToolExecutionContext,
  ): Promise<unknown>;

  getMetadata?(): ToolMetadata;
}
