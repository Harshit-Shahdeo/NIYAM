import { IsObject, IsString } from 'class-validator';

export class ProposedActionDto {
  @IsString()
  tool!: string;

  @IsString()
  operation!: string;

  @IsObject()
  arguments!: Record<string, unknown>;
}