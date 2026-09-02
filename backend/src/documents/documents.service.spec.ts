import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService, TemporaryDocument } from './documents.service';
import { NotFoundException, GoneException } from '@nestjs/common';

describe('DocumentsService', () => {
    let service: DocumentsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DocumentsService],
        }).compile();

        service = module.get<DocumentsService>(DocumentsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should store and consume a valid document', () => {
        const doc: TemporaryDocument = {
            token: 'valid-token',
            buffer: Buffer.from('test'),
            userId: 'user1',
            institutionId: 'inst1',
            documentType: 'TEST',
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // expires in 5 mins
        };

        service.storeDocument(doc);
        const result = service.consume('valid-token');
        
        expect(result).toEqual(Buffer.from('test'));
    });

    it('should throw NotFoundException for unknown token', () => {
        expect(() => service.consume('unknown')).toThrow(NotFoundException);
    });

    it('should atomically remove token on consume and throw NotFoundException on reuse', () => {
        const doc: TemporaryDocument = {
            token: 'reuse-token',
            buffer: Buffer.from('test'),
            userId: 'user1',
            institutionId: 'inst1',
            documentType: 'TEST',
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        };

        service.storeDocument(doc);
        service.consume('reuse-token'); // First consume succeeds

        // Second consume fails
        expect(() => service.consume('reuse-token')).toThrow(NotFoundException);
    });

    it('should throw GoneException if document has expired', () => {
        const doc: TemporaryDocument = {
            token: 'expired-token',
            buffer: Buffer.from('test'),
            userId: 'user1',
            institutionId: 'inst1',
            documentType: 'TEST',
            expiresAt: new Date(Date.now() - 1000), // expired 1s ago
        };

        service.storeDocument(doc);

        expect(() => service.consume('expired-token')).toThrow(GoneException);

        // It should also have deleted the token, so next try is NotFound
        expect(() => service.consume('expired-token')).toThrow(NotFoundException);
    });
});
