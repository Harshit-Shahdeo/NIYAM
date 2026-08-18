import { IsString } from 'class-validator';

export class LabBookingArgsDto {
  @IsString()
  resource!: string;

  @IsString()
  date!: string;

  @IsString()
  start!: string;

  @IsString()
  end!: string;

  @IsString()
  purpose!: string;
}