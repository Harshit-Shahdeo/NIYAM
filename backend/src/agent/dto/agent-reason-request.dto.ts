import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { AgentUserDto } from './agent-user.dto';
import { ConversationMessageDto } from './conversation-messages.dto';

export class AgentReasonRequestDto {
  @IsString()
  request_id!: string;

  @IsString()
  message!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AgentUserDto)
  user?: AgentUserDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConversationMessageDto)
  conversation!: ConversationMessageDto[];
}