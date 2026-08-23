import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ProposedActionDto } from './proposed-action.dto';
import { AgentSourceDto } from './agent-source.dto';

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

  @IsIn(['ALLOW', 'REQUIRE_HUMAN_APPROVAL', 'REJECT'])
  decision!: 'ALLOW' | 'REQUIRE_HUMAN_APPROVAL' | 'REJECT';

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
}
