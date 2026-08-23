import { ToolExecutionContext } from './tool-execution-context';

export abstract class InstitutionalTool {
  abstract readonly name: string;

  abstract execute(
    operation: string,
    arguments_: Record<string, unknown>,
    context: ToolExecutionContext,
  ): Promise<unknown>;
}
