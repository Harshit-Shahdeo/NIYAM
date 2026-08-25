import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { AgentService } from './agent.service';
import { AgentReasonRequestDto } from './dto/agent-reason-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) { }

  @Post('reason')
  @UseGuards(JwtAuthGuard)
  async reason(
    @Body() request: AgentReasonRequestDto,
    @Req() req: Request,
  ) {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.agentService.reason(
      request,
      req.user as {
        userId: string;
        institutionId: string;
        role: string;
      },
    );
  }
}