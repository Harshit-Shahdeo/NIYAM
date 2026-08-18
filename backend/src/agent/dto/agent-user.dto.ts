import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class AgentUserDto {
  @IsString()
  id!: string;

  @IsIn(['STUDENT', 'FACULTY', 'ADMIN'])
  role!: 'STUDENT' | 'FACULTY' | 'ADMIN';

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsInt()
  year?: number;
}