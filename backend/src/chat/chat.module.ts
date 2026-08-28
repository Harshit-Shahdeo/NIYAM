import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { AgentModule } from '../agent/agent.module';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
    imports: [
        DatabaseModule,
        AgentModule,
    ],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule { }