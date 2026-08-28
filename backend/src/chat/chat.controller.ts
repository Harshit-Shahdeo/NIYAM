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
import { AuthenticatedUser } from '../auth/types/authenticated-user.interface';

import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
    ) { }

    @Post('conversations')
    async createConversation(
        @Body() dto: CreateConversationDto,
        @Req() request: Request & { user: AuthenticatedUser },
    ) {
        return this.chatService.createConversation(
            request.user,
            dto,
        );
    }

    @Get('conversations')
    async getConversations(
        @Req() request: Request & { user: AuthenticatedUser },
    ) {
        return this.chatService.getConversations(
            request.user,
        );
    }

    @Get('conversations/:id')
    async getConversation(
        @Param('id') id: string,
        @Req() request: Request & { user: AuthenticatedUser },
    ) {
        return this.chatService.getConversation(
            id,
            request.user,
        );
    }

    @Post('conversations/:id/messages')
    async sendMessage(
        @Param('id') id: string,
        @Body() dto: SendMessageDto,
        @Req() request: Request & { user: AuthenticatedUser },
    ) {
        return this.chatService.sendMessage(
            id,
            dto.message,
            request.user,
        );
    }
}