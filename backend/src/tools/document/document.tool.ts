import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { InstitutionalTool } from '../institutional-tools';
import { ToolExecutionContext } from '../tool-execution-context';
import { DocumentsService } from '../../documents/documents.service';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as crypto from 'crypto';

@Injectable()
export class DocumentTool extends InstitutionalTool {
    readonly name = 'DOCUMENT';

    constructor(
        private readonly prisma: PrismaService,
        private readonly documentsService: DocumentsService,
    ) {
        super();
    }

    async execute(
        operation: string,
        arguments_: Record<string, unknown>,
        context: ToolExecutionContext,
    ): Promise<unknown> {
        switch (operation) {
            case 'GENERATE_ADMIT_CARD':
                return this.generateAdmitCard(arguments_, context);
            default:
                throw new BadRequestException(
                    `Unsupported DocumentTool operation: ${operation}`,
                );
        }
    }

    private async generateAdmitCard(
        arguments_: Record<string, unknown>,
        context: ToolExecutionContext,
    ) {
        const { semester } = arguments_;

        if (typeof semester !== 'number' || !Number.isInteger(semester) || semester <= 0) {
            throw new BadRequestException('semester is required and must be a positive integer.');
        }

        if (context.role !== 'STUDENT') {
            throw new ForbiddenException('Only students can generate their own admit card.');
        }

        const authStudentProfile = await this.prisma.studentProfile.findFirst({
            where: {
                userId: context.userId,
                institutionId: context.institutionId,
            },
            include: {
                institution: true,
                user: true,
            },
        });

        if (!authStudentProfile) {
            throw new NotFoundException('Authenticated student profile not found.');
        }

        if (!authStudentProfile.program) {
            throw new BadRequestException('Student profile is missing program information required for exam schedule.');
        }

        const examSchedules = await this.prisma.examSchedule.findMany({
            where: {
                institutionId: context.institutionId,
                program: authStudentProfile.program,
                semester: semester,
            },
            orderBy: {
                examDate: 'asc',
            }
        });

        if (examSchedules.length === 0) {
            throw new NotFoundException(`No exam schedule found for ${authStudentProfile.program} Semester ${semester}.`);
        }

        // Generate PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        let y = 800;
        const pageWidth = 595.28;
        const margin = 40;

        // Header Background
        page.drawRectangle({
            x: margin,
            y: y - 50,
            width: pageWidth - margin * 2,
            height: 60,
            color: rgb(0.15, 0.20, 0.35)
        });

        // Header
        const title = "NIYAM MOCK UNIVERSITY";
        const titleWidth = fontBold.widthOfTextAtSize(title, 20);
        page.drawText(title, { x: (pageWidth - titleWidth) / 2, y: y - 15, size: 20, font: fontBold, color: rgb(1, 1, 1) });
        
        y -= 35;
        const subtitle = "EXAMINATION SECTION";
        const subtitleWidth = fontBold.widthOfTextAtSize(subtitle, 12);
        page.drawText(subtitle, { x: (pageWidth - subtitleWidth) / 2, y, size: 12, font: fontBold, color: rgb(1, 1, 1) });
        y -= 50;

        const examTitle = `SEMESTER ${semester} EXAMINATION`;
        const examTitleWidth = fontBold.widthOfTextAtSize(examTitle, 12);
        page.drawText(examTitle, { x: (pageWidth - examTitleWidth) / 2, y, size: 12, font: fontBold, color: rgb(0, 0, 0) });
        y -= 30;

        const admitCard = "ADMIT CARD";
        const admitCardWidth = fontBold.widthOfTextAtSize(admitCard, 14);
        page.drawText(admitCard, { x: (pageWidth - admitCardWidth) / 2, y, size: 14, font: fontBold, color: rgb(0, 0, 0) });
        y -= 50;

        // Student Info
        const infoX = margin;
        const valX = margin + 120;
        const lineSpacing = 20;

        page.drawText("REGISTRATION NO", { x: infoX, y, size: 10, font: fontBold });
        page.drawText(`: ${authStudentProfile.enrollmentNumber}`, { x: valX, y, size: 10, font });
        y -= lineSpacing;

        page.drawText("STUDENT NAME", { x: infoX, y, size: 10, font: fontBold });
        page.drawText(`: ${authStudentProfile.user.name}`, { x: valX, y, size: 10, font });
        y -= lineSpacing;

        page.drawText("PROGRAM", { x: infoX, y, size: 10, font: fontBold });
        page.drawText(`: ${authStudentProfile.program}`, { x: valX, y, size: 10, font });
        y -= lineSpacing;

        page.drawText("BRANCH", { x: infoX, y, size: 10, font: fontBold });
        page.drawText(`: ${authStudentProfile.program}`, { x: valX, y, size: 10, font });
        y -= 50;

        // Table
        const colWidths = [40, 200, 90, 90, 95];
        const colXs = [margin];
        for (let i = 0; i < colWidths.length - 1; i++) {
            colXs.push(colXs[i] + colWidths[i]);
        }
        const tableWidth = pageWidth - margin * 2;
        const rowHeight = 25;

        const headers = ["SEM", "Subject Name", "Date", "Time", "Exam Center"];
        
        // Header Row
        page.drawRectangle({
            x: margin,
            y: y - 5,
            width: tableWidth,
            height: rowHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
        });
        
        for (let i = 0; i < headers.length; i++) {
            page.drawText(headers[i], {
                x: colXs[i] + 5,
                y: y + 5,
                size: 9,
                font: fontBold,
            });
            if (i > 0) {
                page.drawLine({
                    start: { x: colXs[i], y: y - 5 },
                    end: { x: colXs[i], y: y + rowHeight - 5 },
                    color: rgb(0, 0, 0),
                    thickness: 1,
                });
            }
        }
        y -= rowHeight;

        for (const schedule of examSchedules) {
            page.drawRectangle({
                x: margin,
                y: y - 5,
                width: tableWidth,
                height: rowHeight,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1,
            });

            // SEM
            page.drawText(String(semester), { x: colXs[0] + 5, y: y + 5, size: 8, font });

            // Subject Name
            let subjectName = `${schedule.courseCode} -- ${schedule.subjectName}`;
            if (subjectName.length > 40) subjectName = subjectName.substring(0, 37) + '...';
            page.drawText(subjectName, { x: colXs[1] + 5, y: y + 5, size: 8, font });

            // Date
            const dateObj = schedule.examDate;
            const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
            page.drawText(formattedDate, { x: colXs[2] + 5, y: y + 5, size: 8, font });

            // Time
            page.drawText(schedule.examTime, { x: colXs[3] + 5, y: y + 5, size: 8, font });

            // Exam Center
            let center = schedule.examCenter;
            if (center.length > 18) center = center.substring(0, 16) + '..';
            page.drawText(center, { x: colXs[4] + 5, y: y + 5, size: 8, font });

            // Draw column lines
            for (let i = 1; i < colXs.length; i++) {
                page.drawLine({
                    start: { x: colXs[i], y: y - 5 },
                    end: { x: colXs[i], y: y + rowHeight - 5 },
                    color: rgb(0, 0, 0),
                    thickness: 1,
                });
            }
            
            y -= rowHeight;
        }

        y -= 40;

        page.drawText("Note :- 1. Students must carry their admit card and valid university ID during the examination.", { x: margin, y, size: 8, font });
        y -= 15;
        page.drawText("Note :- 2. Mobile phones and unauthorized electronic gadgets are not permitted during the examination.", { x: margin, y, size: 8, font });
        y -= 15;
        page.drawText("Note :- 3. Students should report to the examination center before the scheduled examination time.", { x: margin, y, size: 8, font });

        y = 100;
        page.drawText("Student Sign.", { x: margin, y, size: 10, font });
        const coeLabel = "Controller of Examination";
        const rightAlign = pageWidth - margin - font.widthOfTextAtSize(coeLabel, 10);
        page.drawText(coeLabel, { x: rightAlign, y, size: 10, font });

        const pdfBytes = await pdfDoc.save();
        const buffer = Buffer.from(pdfBytes);

        const token = crypto.randomUUID();
        this.documentsService.storeDocument({
            token,
            buffer,
            userId: context.userId,
            institutionId: context.institutionId,
            documentType: 'ADMIT_CARD',
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        });

        return {
            message: `Admit card generated successfully.\n\n[Download Admit Card](/api/documents/download/${token})`,
        };
    }
}
