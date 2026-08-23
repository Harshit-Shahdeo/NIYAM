import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApprovalsService } from './approvals.service';
import type { ReviewApprovalDto } from './approvals.service';

@Controller('approvals')
export class ApprovalsController {
  constructor(private readonly approvalsService: ApprovalsService) {}

  @Get()
  async listPending(@Query('institutionId') institutionId?: string) {
    return this.approvalsService.listPending(institutionId);
  }

  @Post(':id/review')
  async review(@Param('id') id: string, @Body() dto: ReviewApprovalDto) {
    return this.approvalsService.review(id, dto);
  }
}
