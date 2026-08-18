import { HttpService } from '@nestjs/axios';
import { AgentReasonRequestDto } from './dto/agent-reason-request.dto';
import { AgentReasonResponseDto } from './dto/agent-reason-response.dto';
export declare class AgentService {
    private readonly httpService;
    constructor(httpService: HttpService);
    reason(request: AgentReasonRequestDto): Promise<AgentReasonResponseDto>;
}
