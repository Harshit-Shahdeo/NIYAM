import { Body, Controller, Post } from '@nestjs/common';

import { AgentService } from './agent.service';
import { AgentReasonRequestDto } from './dto/agent-reason-request.dto';

@Controller('agent')
export class AgentController {

  constructor(
    private readonly agentService: AgentService,
  ) {}

  @Post('reason')
  async reason(
    @Body() request: AgentReasonRequestDto,
  ) {
    return this.agentService.reason(request);
  }
}