import { PrismaService } from '../database/prisma.service';
import { AuditEventType, Prisma } from '@prisma/client';
export declare class AuditService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    record(institutionId: string, requestId: string, eventType: AuditEventType, options?: {
        actorId?: string;
        metadata?: Prisma.InputJsonValue;
    }): Promise<void>;
}
