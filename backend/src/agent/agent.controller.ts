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
  async reason(
    @Body() request: AgentReasonRequestDto,
    @Req() req: Request,
  ) {
    const authUser = (req.user as {
      userId: string;
      institutionId: string;
      role: string;
    }) || {
      userId: request.user?.id || 'student_001',
      institutionId: '355a8671-0fc1-4efe-9a36-803e1dbbfefe',
      role: request.user?.role || 'STUDENT',
    };

    return this.agentService.reason(request, authUser);
  }
}