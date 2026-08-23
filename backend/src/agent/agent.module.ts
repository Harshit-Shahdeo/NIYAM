import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { DatabaseModule } from '../database/database.module';
import { ToolsModule } from '../tools/tools.module';

import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { AuditModule } from '../audit/audit.module';
@Module({
  imports: [HttpModule, DatabaseModule, ToolsModule, AuditModule],

  controllers: [AgentController],

  providers: [AgentService],
})
export class AgentModule {}
