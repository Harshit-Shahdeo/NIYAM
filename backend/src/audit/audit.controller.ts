import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('requests')
  async listRequests(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('institutionId') institutionId?: string,
  ) {
    const take = limit ? parseInt(limit, 10) : 20;
    const skip = offset ? parseInt(offset, 10) : 0;
    return this.auditService.listRequests(take, skip, institutionId);
  }

  @Get('requests/:requestId/timeline')
  async getRequestTimeline(@Param('requestId') requestId: string) {
    return this.auditService.getRequestTimeline(requestId);
  }
}
