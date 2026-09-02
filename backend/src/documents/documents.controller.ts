import { Controller, Get, Param, Res, NotFoundException, GoneException } from '@nestjs/common';
import type { Response } from 'express';
import { DocumentsService } from './documents.service';

@Controller('api/documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) {}

    @Get('download/:token')
    downloadDocument(@Param('token') token: string, @Res() res: Response) {
        try {
            const buffer = this.documentsService.consume(token);
            
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
            res.send(buffer);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof GoneException) {
                res.status(error.getStatus()).send(error.message);
            } else {
                res.status(500).send('Internal server error');
            }
        }
    }
}
