import { ProposedActionDto } from './proposed-action.dto';
import { AgentSourceDto } from './agent-source.dto';
export declare class AgentReasonResponseDto {
    intent: string;
    confidence_score: number;
    uncertainty_detected: boolean;
    policy_conflict_detected: boolean;
    requires_approval: boolean;
    decision: 'ALLOW' | 'REQUIRE_HUMAN_APPROVAL' | 'REJECT';
    proposed_action: ProposedActionDto | null;
    sources: AgentSourceDto[];
    reason: string;
}
