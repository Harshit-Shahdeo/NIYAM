import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { DatabaseModule } from '../database/database.module';
import { AuditModule } from '../audit/audit.module';

import { LabBookingTool } from './scheduling/applications/laboratory/lab-booking.tool';
import { MaintenanceTicketTool } from './maintenance/maintenance-ticket.tool';
import { SchedulingService } from './scheduling/core/scheduling.service';

import { StudentInfoTool } from './student/student-info.tool';
import { StudentResultTool } from './student/student-result.tool';
import { AdmitCardTool } from './student/admit-card.tool';
import { AttendanceTool } from './student/attendance.tool';
import { MockErpService } from './mock-erp/mock-erp.service';

import { ToolRegistry } from './tool-registry';
import { ToolsController } from './tools.controller';

@Module({
  imports: [DatabaseModule, DiscoveryModule, AuditModule],

  controllers: [ToolsController],

  providers: [
    ToolRegistry,
    SchedulingService,
    MockErpService,
    LabBookingTool,
    MaintenanceTicketTool,
    StudentInfoTool,
    StudentResultTool,
    AdmitCardTool,
    AttendanceTool,
  ],

  exports: [
    ToolRegistry,
    SchedulingService,
    MockErpService,
    MaintenanceTicketTool,
    StudentInfoTool,
    StudentResultTool,
    AdmitCardTool,
    AttendanceTool,
  ],
})
export class ToolsModule {}
