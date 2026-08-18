import { AgentService } from './agent.service';
import { AgentReasonRequestDto } from './dto/agent-reason-request.dto';
export declare class AgentController {
    private readonly agentService;
    constructor(agentService: AgentService);
    reason(request: AgentReasonRequestDto): Promise<import("./dto/agent-reason-response.dto").AgentReasonResponseDto>;
}
