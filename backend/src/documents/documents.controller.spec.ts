import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { NotFoundException, GoneException } from '@nestjs/common';

describe('DocumentsController', () => {
    let controller: DocumentsController;
    let service: DocumentsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DocumentsController],
            providers: [
                {
                    provide: DocumentsService,
                    useValue: {
                        consume: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<DocumentsController>(DocumentsController);
        service = module.get<DocumentsService>(DocumentsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return PDF buffer with correct headers', () => {
        const mockBuffer = Buffer.from('pdf content');
        (service.consume as jest.Mock).mockReturnValue(mockBuffer);

        const mockResponse = {
            setHeader: jest.fn(),
            send: jest.fn(),
        };

        controller.downloadDocument('valid-token', mockResponse as any);

        expect(service.consume).toHaveBeenCalledWith('valid-token');
        expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
        expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Disposition', 'attachment; filename="document.pdf"');
        expect(mockResponse.send).toHaveBeenCalledWith(mockBuffer);
    });

    it('should return 404 for unknown token', () => {
        (service.consume as jest.Mock).mockImplementation(() => {
            throw new NotFoundException('Document not found');
        });

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        controller.downloadDocument('invalid-token', mockResponse as any);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith('Document not found');
    });

    it('should return 410 for expired token', () => {
        (service.consume as jest.Mock).mockImplementation(() => {
            throw new GoneException('This document link has expired.');
        });

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        controller.downloadDocument('expired-token', mockResponse as any);

        expect(mockResponse.status).toHaveBeenCalledWith(410);
        expect(mockResponse.send).toHaveBeenCalledWith('This document link has expired.');
    });

    it('should return 500 for generic error', () => {
        (service.consume as jest.Mock).mockImplementation(() => {
            throw new Error('Some random error');
        });

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        controller.downloadDocument('error-token', mockResponse as any);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith('Internal server error');
    });
});
