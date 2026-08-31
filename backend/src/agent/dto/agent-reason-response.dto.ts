import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ProposedActionDto } from './proposed-action.dto';
import { AgentSourceDto } from './agent-source.dto';

export class ExecutionErrorDto {
  @IsNumber()
  code!: number;

  @IsString()
  message!: string;

  @IsOptional()
  @IsObject()
  nextAvailable?: Record<string, unknown>;
}

export class AgentReasonResponseDto {
  @IsString()
  intent!: string;

  @IsNumber()
  confidence_score!: number;

  @IsBoolean()
  uncertainty_detected!: boolean;

  @IsBoolean()
  policy_conflict_detected!: boolean;

  @IsBoolean()
  requires_approval!: boolean;

  @IsIn([
    'ALLOW',
    'REQUIRE_HUMAN_APPROVAL',
    'REJECT',
  ])
  decision!:
    | 'ALLOW'
    | 'REQUIRE_HUMAN_APPROVAL'
    | 'REJECT';

  @IsOptional()
  @ValidateNested()
  @Type(() => ProposedActionDto)
  proposed_action!: ProposedActionDto | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AgentSourceDto)
  sources!: AgentSourceDto[];

  @IsString()
  reason!: string;

  @IsOptional()
  @IsString()
  assistant_message?: string;

  /*
   * Result returned by an institutional tool after execution.
   *
   * This is populated by the backend, not by the AI model.
   */
  @IsOptional()
  @IsObject()
  execution_result?: Record<string, unknown>;

  @IsOptional()
  @ValidateNested()
  @Type(() => ExecutionErrorDto)
  execution_error?: ExecutionErrorDto;

  @IsOptional()
  @IsString()
  service_request_id?:string;
}