import { Injectable, NotFoundException, GoneException } from '@nestjs/common';

export interface TemporaryDocument {
    token: string;
    buffer: Buffer;
    userId: string;
    institutionId: string;
    documentType: string;
    expiresAt: Date;
}

@Injectable()
export class DocumentsService {
    private documents = new Map<string, TemporaryDocument>();

    storeDocument(document: TemporaryDocument): void {
        this.documents.set(document.token, document);
    }

    consume(token: string): Buffer {
        const doc = this.documents.get(token);
        
        if (!doc) {
            throw new NotFoundException('Document not found or has already been downloaded.');
        }

        // Atomically remove the token before returning to prevent race conditions
        this.documents.delete(token);

        if (doc.expiresAt.getTime() < Date.now()) {
            throw new GoneException('This document link has expired.');
        }

        return doc.buffer;
    }
}
