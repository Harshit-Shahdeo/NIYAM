import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthenticatedUser } from '../auth/types/authenticated-user.interface';
import { ApprovalsService } from './approvals.service';
import type { ReviewApprovalDto } from './approvals.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('approvals')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class ApprovalsController {
  constructor(
    private readonly approvalsService: ApprovalsService,
  ) { }

  @Get()
  async listPending(
    @Req() request: Request & { user: AuthenticatedUser },
  ) {
    const user = request.user;

    return this.approvalsService.listPending(
      user.institutionId,
    );
  }

  @Post(':id/review')
  async review(
    @Param('id') id: string,
    @Body() dto: ReviewApprovalDto,
    @Req() request: Request & { user: AuthenticatedUser },
  ) {
    const user = request.user;

    return this.approvalsService.review(
      id,
      dto,
      user.userId,
      user.institutionId,
      user.role,
    );
  }
}