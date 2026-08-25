import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AgentModule } from './agent/agent.module';
import { ApprovalsModule } from './approvals/approvals.module';
import { ResourcesModule } from './resources/resources.module';
import { AuditModule } from './audit/audit.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { MaintenanceModule } from './maintenance/maintenance.module';

@Module({
  imports: [
    AgentModule,
    ApprovalsModule,
    ResourcesModule,
    AuditModule,
    AuthModule,
    StudentsModule,
    MaintenanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }