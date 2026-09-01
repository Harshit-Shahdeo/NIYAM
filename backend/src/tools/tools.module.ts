import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { DatabaseModule } from '../database/database.module';
import { AuditModule } from '../audit/audit.module';

import { LabBookingTool } from './scheduling/applications/laboratory/lab-booking.tool';
import { MaintenanceTicketTool } from './maintenance/maintenance-ticket.tool';
import { SchedulingService } from './scheduling/core/scheduling.service';

import { StudentInfoTool } from './student/student-info.tool';

import { ToolRegistry } from './tool-registry';
import { ErpTool } from './erp/erp.tool';

@Module({
  imports: [
    DatabaseModule,
    DiscoveryModule,
    AuditModule,
  ],

  providers: [
    ToolRegistry,
    SchedulingService,
    LabBookingTool,
    MaintenanceTicketTool,
    StudentInfoTool,
    ErpTool,
  ],

  exports: [
    ToolRegistry,
    SchedulingService,
    MaintenanceTicketTool,
    StudentInfoTool,
    ErpTool,
  ],
})
export class ToolsModule { }