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

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthenticatedUser } from '../auth/types/authenticated-user.interface';

import { ApprovalsService } from './approvals.service';
import type { ReviewApprovalDto } from './approvals.service';

@Controller('approvals')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class ApprovalsController {
  constructor(
    private readonly approvalsService: ApprovalsService,
  ) { }

  /*
   * Return all pending approvals belonging to the
   * authenticated administrator's institution.
   */
  @Get()
  async listPending(
    @Req() request: Request & { user: AuthenticatedUser },
  ) {
    return this.approvalsService.listPending(
      request.user.institutionId,
    );
  }

  /*
   * Review an approval.
   *
   * Identity, institution, and role are taken from
   * the authenticated JWT user rather than the request body.
   */
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