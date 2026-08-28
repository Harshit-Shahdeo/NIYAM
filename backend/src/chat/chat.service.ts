import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { AuthenticatedUser } from '../auth/types/authenticated-user.interface';
import { AgentService } from '../agent/agent.service';

import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ChatService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly agentService: AgentService,
    ) { }

    async createConversation(
        user: AuthenticatedUser,
        dto: CreateConversationDto,
    ) {
        return this.prisma.conversation.create({
            data: {
                institutionId: user.institutionId,
                userId: user.userId,
                title: dto.title,
            },
        });
    }

    async getConversations(
        user: AuthenticatedUser,
    ) {
        return this.prisma.conversation.findMany({
            where: {
                userId: user.userId,
                institutionId: user.institutionId,
            },
            orderBy: {
                updatedAt: 'desc',
            },
            include: {
                _count: {
                    select: {
                        messages: true,
                    },
                },
            },
        });
    }

    async getConversation(
        conversationId: string,
        user: AuthenticatedUser,
    ) {
        const conversation =
            await this.prisma.conversation.findFirst({
                where: {
                    id: conversationId,
                    userId: user.userId,
                    institutionId: user.institutionId,
                },
                include: {
                    messages: {
                        orderBy: {
                            createdAt: 'asc',
                        },
                    },
                },
            });

        if (!conversation) {
            throw new NotFoundException(
                'Conversation not found.',
            );
        }

        return conversation;
    }

    async sendMessage(
        conversationId: string,
        message: string,
        user: AuthenticatedUser,
    ) {
        /*
         * Security:
         * Never allow a user to send messages to another
         * user's conversation.
         */
        const conversation =
            await this.prisma.conversation.findFirst({
                where: {
                    id: conversationId,
                    userId: user.userId,
                    institutionId: user.institutionId,
                },
            });

        if (!conversation) {
            throw new ForbiddenException(
                'You do not have access to this conversation.',
            );
        }

        /*
         * Store the user's message first.
         */
        const userMessage =
            await this.prisma.message.create({
                data: {
                    conversationId,
                    userId: user.userId,
                    role: 'USER',
                    content: message,
                },
            });

        /*
         * Get previous conversation history.
         *
         * We explicitly exclude the newest message by ID since it is
         * passed separately as the current request.
         * We retrieve at most 5 messages, newest first, then reverse
         * them to restore chronological order for the AI.
         */
        const previousMessages =
            await this.prisma.message.findMany({
                where: {
                    conversationId,
                    id: {
                        not: userMessage.id,
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 5,
            });

        const conversationHistory: {
            role: 'user' | 'assistant';
            content: string;
        }[] = previousMessages
            .reverse()
            .map((msg) => ({
                role:
                    msg.role === 'ASSISTANT'
                        ? 'assistant'
                        : 'user',
                content: msg.content,
            }));

        /*
         * Generate a unique request ID.
         *
         * This must NOT come from the frontend.
         */
        const requestId = crypto.randomUUID();

        /*
         * Send the message into NIYAM's reasoning engine.
         */
        const aiResponse =
            await this.agentService.reason(
                {
                    request_id: requestId,
                    message,
                    conversation: conversationHistory,
                },
                user,
                conversationId,
            );

        /*
         * Store the assistant's response.
         */
        const assistantMessage =
            await this.prisma.message.create({
                data: {
                    conversationId,
                    userId: user.userId,
                    role: 'ASSISTANT',
                    content: this.getAssistantContent(
                        aiResponse,
                    ),
                },
            });

        /*
         * Update conversation timestamp.
         */
        await this.prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                updatedAt: new Date(),
            },
        });

        return {
            conversationId,
            userMessage,
            assistantMessage,
            reasoning: aiResponse,
        };
    }

    private getAssistantContent(
        aiResponse: {
            decision?: unknown;
            assistant_message?: unknown;
            reason?: unknown;
            execution_result?: unknown;
            execution_error?: unknown;
        },
    ): string {
        /*
         * 1. Handle execution errors first.
         *
         * This includes expected errors such as an unavailable
         * booking slot. The institutional tool provides trusted
         * error information which is converted into a user-facing
         * response here.
         */
        const executionError =
            aiResponse.execution_error;

        if (
            executionError &&
            typeof executionError === 'object' &&
            !Array.isArray(executionError)
        ) {
            const err =
                executionError as Record<string, unknown>;

            /*
             * Handle unavailable booking slots that include
             * the next available time.
             */
            if (
                err.nextAvailable &&
                typeof err.nextAvailable === 'object' &&
                err.nextAvailable !== null
            ) {
                const next =
                    err.nextAvailable as Record<
                        string,
                        unknown
                    >;

                if (next.start && next.end) {
                    const startStr =
                        typeof next.start === 'string'
                            ? next.start.substring(
                                11,
                                16,
                            )
                            : (
                                next.start as Date
                            )
                                .toISOString()
                                .substring(11, 16);

                    const endStr =
                        typeof next.end === 'string'
                            ? next.end.substring(
                                11,
                                16,
                            )
                            : (
                                next.end as Date
                            )
                                .toISOString()
                                .substring(11, 16);

                    return (
                        'Requested time slot is unavailable. ' +
                        `The next available slot is from ${startStr} ` +
                        `to ${endStr}. ` +
                        'Would you like me to book it?'
                    );
                }
            }

            /*
             * Handle any other trusted institutional error.
             */
            if (
                typeof err.message === 'string' &&
                err.message.trim().length > 0
            ) {
                return err.message;
            }
        }

        /*
         * 2. Handle successful immediate tool execution.
         *
         * If the institutional tool returns a trusted user-facing
         * message, prefer that over the AI-generated message.
         */
        const executionResult =
            aiResponse.execution_result;

        if (
            executionResult &&
            typeof executionResult === 'object' &&
            !Array.isArray(executionResult)
        ) {
            const result =
                executionResult as Record<
                    string,
                    unknown
                >;

            if (
                typeof result.message === 'string' &&
                result.message.trim().length > 0
            ) {
                return result.message;
            }

            /*
             * Some tools may return a ticket identifier directly.
             */
            if (
                typeof result.ticket === 'string' &&
                result.ticket.trim().length > 0
            ) {
                return (
                    'Your request was completed successfully. ' +
                    `Reference: ${result.ticket}`
                );
            }
        }

        /*
         * 3. Explicitly handle requests that are waiting
         * for human approval.
         *
         * The request has already been persisted and an Approval
         * record has been created by AgentService. Therefore, even
         * if the AI service does not provide an assistant_message,
         * we must give the user a clear status message instead of
         * falling back to a generic failure message.
         */
        if (
            aiResponse.decision ===
            'REQUIRE_HUMAN_APPROVAL'
        ) {
            if (
                typeof aiResponse.assistant_message ===
                'string' &&
                aiResponse.assistant_message
                    .trim()
                    .length > 0
            ) {
                return aiResponse.assistant_message;
            }

            return (
                'Your request has been submitted for administrator ' +
                'approval. You will be notified here once it has ' +
                'been reviewed.'
            );
        }

        /*
         * 4. Use the AI-generated assistant message for
         * normal informational or non-executed responses.
         */
        if (
            typeof aiResponse.assistant_message ===
            'string' &&
            aiResponse.assistant_message
                .trim()
                .length > 0
        ) {
            return aiResponse.assistant_message;
        }

        /*
         * 5. If the AI rejected the request but did not provide
         * a user-facing message, use the reasoning reason when
         * available.
         */
        if (
            aiResponse.decision === 'REJECT' &&
            typeof aiResponse.reason === 'string' &&
            aiResponse.reason.trim().length > 0
        ) {
            return aiResponse.reason;
        }

        /*
         * 6. Final safe fallback.
         */
        return 'Your request has been processed.';
    }
}