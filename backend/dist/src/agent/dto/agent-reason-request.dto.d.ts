import { AgentUserDto } from './agent-user.dto';
import { ConversationMessageDto } from './conversation-messages.dto';
export declare class AgentReasonRequestDto {
    request_id: string;
    message: string;
    user: AgentUserDto;
    conversation: ConversationMessageDto[];
}
