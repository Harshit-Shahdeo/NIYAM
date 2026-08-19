import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import {
    AuditEventType,
    Prisma,
} from '@prisma/client';

@Injectable()
export class AuditService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async record(
        institutionId: string,
        requestId: string,
        eventType: AuditEventType,
        options?: {
            actorId?: string;
            metadata?: Prisma.InputJsonValue;
        },
    ): Promise<void> {
        await this.prisma.auditEvent.create({
            data: {
                institutionId,
                requestId,
                actorId: options?.actorId,
                eventType,
                metadata: options?.metadata,
            },
        });
    }
}