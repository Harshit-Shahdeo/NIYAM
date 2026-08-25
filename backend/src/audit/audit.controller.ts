import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthenticatedUser } from '../auth/types/authenticated-user.interface';

@Controller('audit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('requests')
  @Roles('ADMIN')
  async listRequests(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('institutionId') institutionId?: string,
    @Req() req?: Request & { user?: AuthenticatedUser },
  ) {
    const take = limit ? parseInt(limit, 10) : 20;
    const skip = offset ? parseInt(offset, 10) : 0;
    const targetInst = institutionId || req?.user?.institutionId;
    return this.auditService.listRequests(take, skip, targetInst);
  }

  @Get('requests/:requestId/timeline')
  @Roles('STUDENT', 'FACULTY', 'ADMIN')
  async getRequestTimeline(
    @Param('requestId') requestId: string,
    @Req() req: Request & { user?: AuthenticatedUser },
  ) {
    return this.auditService.getRequestTimeline(requestId, req.user);
  }
}
