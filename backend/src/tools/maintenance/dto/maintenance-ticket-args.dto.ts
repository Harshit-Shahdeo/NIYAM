import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum MaintenanceCategory {
  ELECTRICAL = 'ELECTRICAL',
  PLUMBING = 'PLUMBING',
  HVAC = 'HVAC',
  IT = 'IT',
  CIVIL = 'CIVIL',
  LAB_EQUIPMENT = 'LAB_EQUIPMENT',
}

export enum MaintenanceUrgency {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  EMERGENCY = 'EMERGENCY',
}

export class MaintenanceTicketArgsDto {
  @IsString()
  location!: string;

  @IsEnum(MaintenanceCategory, {
    message:
      'category must be one of: ELECTRICAL, PLUMBING, HVAC, IT, CIVIL, LAB_EQUIPMENT',
  })
  category!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsEnum(MaintenanceUrgency, {
    message: 'urgency must be one of: LOW, MEDIUM, HIGH, EMERGENCY',
  })
  urgency?: string;
}
