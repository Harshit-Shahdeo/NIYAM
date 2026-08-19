import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { DatabaseModule } from '../database/database.module';
import { AuditModule } from '../audit/audit.module';

import { LabBookingTool } from './scheduling/applications/laboratory/lab-booking.tool';
import { SchedulingService } from './scheduling/core/scheduling.service';
import { ToolRegistry } from './tool-registry';

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
    ],

    exports: [
        ToolRegistry,
        SchedulingService,
    ],
})
export class ToolsModule { }