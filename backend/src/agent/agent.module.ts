import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { DatabaseModule } from '../database/database.module';
import { ToolsModule } from '../tools/tools.module';
import { AuditModule } from '../audit/audit.module';
import { StudentsModule } from '../students/students.module';

import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    ToolsModule,
    AuditModule,
    StudentsModule,
  ],

  controllers: [AgentController],

  providers: [AgentService],
})
export class AgentModule { }