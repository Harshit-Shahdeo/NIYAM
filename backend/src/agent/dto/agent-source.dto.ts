import { IsOptional, IsString } from 'class-validator';

export class AgentSourceDto {
  @IsString()
  document!: string;

  @IsOptional()
  @IsString()
  policy_id?: string;

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @IsString()
  chunk_id?: string;
}
