import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { AgentService } from './agent.service';
import { AgentReasonRequestDto } from './dto/agent-reason-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    institutionId: string;
    role: string;
  };
}

@Controller('agent')
@UseGuards(JwtAuthGuard)
export class AgentController {
  constructor(
    private readonly agentService: AgentService,
  ) { }

  @Post('reason')
  async reason(
    @Body() request: AgentReasonRequestDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.agentService.reason(
      request,
      req.user,
    );
  }
}