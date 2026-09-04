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
            case 'GENERATE_RESULT':
                return this.generateResult(arguments_, context);
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

        // Colors
        const redColor = rgb(0.7, 0.1, 0.1);
        const greyBg = rgb(0.95, 0.95, 0.95);
        const blackColor = rgb(0, 0, 0);

        // Header Background for Logo Area
        const logoRadius = 25;
        const logoX = margin + logoRadius;
        const logoY = y - logoRadius + 5;
        
        page.drawCircle({
            x: logoX,
            y: logoY,
            size: logoRadius,
            color: redColor,
        });
        
        const logoText = "NIYAM";
        const logoTextWidth = fontBold.widthOfTextAtSize(logoText, 12);
        page.drawText(logoText, { 
            x: logoX - (logoTextWidth / 2), 
            y: logoY - 4, 
            size: 12, 
            font: fontBold, 
            color: rgb(1, 1, 1) 
        });

        // Institution Header
        const instName = authStudentProfile.institution.name.toUpperCase();
        page.drawText(instName, { x: margin + 70, y: y - 10, size: 18, font: fontBold, color: rgb(0.1, 0.15, 0.4) });
        page.drawText("(Accredited by NAAC)", { x: margin + 70, y: y - 25, size: 9, font: fontBold, color: redColor });
        
        y -= 60;

        // Title
        page.drawRectangle({
            x: margin,
            y: y - 15,
            width: pageWidth - margin * 2,
            height: 20,
            color: blackColor
        });
        const docTitle = `SEMESTER ${semester} EXAMINATION ADMIT CARD`;
        const titleWidth = fontBold.widthOfTextAtSize(docTitle, 12);
        page.drawText(docTitle, { 
            x: (pageWidth - titleWidth) / 2, 
            y: y - 10, 
            size: 12, 
            font: fontBold, 
            color: rgb(1, 1, 1) 
        });

        y -= 40;

        // Student Info Block
        const col1X = margin;
        const valOffset = 110;
        
        const photoTopY = y + 10; // Save the top Y position

        page.drawText("REGISTRATION NO:", { x: col1X, y, size: 9, font: fontBold });
        page.drawText(authStudentProfile.enrollmentNumber, { x: col1X + valOffset, y, size: 10, font: fontBold });
        
        y -= 15;
        page.drawText("STUDENT NAME:", { x: col1X, y, size: 9, font: fontBold });
        page.drawText(authStudentProfile.user.name, { x: col1X + valOffset, y, size: 10, font: fontBold });
        
        y -= 15;
        page.drawText("PROGRAM:", { x: col1X, y, size: 9, font: fontBold });
        page.drawText(authStudentProfile.program || "Not Available", { x: col1X + valOffset, y, size: 9, font });

        // Photo Placeholder
        const photoWidth = 65;
        const photoHeight = 80;
        const photoX = pageWidth - margin - photoWidth;
        
        // Draw dashed box for photo
        page.drawRectangle({
            x: photoX,
            y: photoTopY - photoHeight,
            width: photoWidth,
            height: photoHeight,
            borderColor: rgb(0.5, 0.5, 0.5),
            borderWidth: 1,
            borderDashArray: [3, 3]
        });
        const photoText = "PASSPORT\nPHOTO";
        page.drawText(photoText, { 
            x: photoX + 10, 
            y: photoTopY - photoHeight + 40, 
            size: 8, 
            font: fontBold, 
            color: rgb(0.5, 0.5, 0.5),
            lineHeight: 12
        });

        // Ensure y is below the photo box
        y = Math.min(y - 30, photoTopY - photoHeight - 20);

        // Table
        // SL. NO. | SEM | COURSE CODE | SUBJECT | DATE | TIME | EXAM CENTER
        const colWidths = [35, 30, 75, 130, 70, 70, 105];
        const colXs = [margin];
        for (let i = 0; i < colWidths.length - 1; i++) {
            colXs.push(colXs[i] + colWidths[i]);
        }
        const tableWidth = pageWidth - margin * 2;
        const rowHeight = 22;

        const headers = ["SL. NO.", "SEM", "COURSE CODE", "SUBJECT", "DATE", "TIME", "EXAM CENTER"];
        
        // Header Row
        page.drawRectangle({
            x: margin,
            y: y - 5,
            width: tableWidth,
            height: rowHeight,
            color: greyBg,
            borderColor: blackColor,
            borderWidth: 1,
        });
        
        for (let i = 0; i < headers.length; i++) {
            const hWidth = fontBold.widthOfTextAtSize(headers[i], 7);
            const cx = colXs[i] + (colWidths[i] - hWidth) / 2;
            page.drawText(headers[i], { x: cx, y: y + 2, size: 7, font: fontBold, color: blackColor });
            
            if (i > 0) {
                page.drawLine({
                    start: { x: colXs[i], y: y - 5 },
                    end: { x: colXs[i], y: y + rowHeight - 5 },
                    color: blackColor,
                    thickness: 1,
                });
            }
        }
        y -= rowHeight;

        let index = 1;

        for (const schedule of examSchedules) {
            page.drawRectangle({
                x: margin,
                y: y - 5,
                width: tableWidth,
                height: rowHeight,
                borderColor: blackColor,
                borderWidth: 1,
            });

            // SL NO (Centered)
            const slText = String(index++);
            const slW = font.widthOfTextAtSize(slText, 8);
            page.drawText(slText, { x: colXs[0] + (colWidths[0] - slW) / 2, y: y + 2, size: 8, font });

            // SEM (Centered)
            const semText = String(semester);
            const semW = font.widthOfTextAtSize(semText, 8);
            page.drawText(semText, { x: colXs[1] + (colWidths[1] - semW) / 2, y: y + 2, size: 8, font });

            // Course Code (Centered)
            const ccW = fontBold.widthOfTextAtSize(schedule.courseCode, 8);
            page.drawText(schedule.courseCode, { x: colXs[2] + (colWidths[2] - ccW) / 2, y: y + 2, size: 8, font: fontBold, color: rgb(0.1, 0.15, 0.4) });

            // Subject Name (Left, truncated)
            let subjectName = schedule.subjectName.toUpperCase();
            if (subjectName.length > 25) subjectName = subjectName.substring(0, 22) + '...';
            page.drawText(subjectName, { x: colXs[3] + 5, y: y + 2, size: 7.5, font });

            // Date (Centered)
            const dateObj = schedule.examDate;
            const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
            const dW = font.widthOfTextAtSize(formattedDate, 7.5);
            page.drawText(formattedDate, { x: colXs[4] + (colWidths[4] - dW) / 2, y: y + 2, size: 7.5, font });

            // Time (Centered)
            const timeText = schedule.examTime;
            const tW = font.widthOfTextAtSize(timeText, 7.5);
            page.drawText(timeText, { x: colXs[5] + (colWidths[5] - tW) / 2, y: y + 2, size: 7.5, font });

            // Exam Center (Left, truncated)
            let center = schedule.examCenter;
            if (center.length > 20) center = center.substring(0, 18) + '..';
            page.drawText(center, { x: colXs[6] + 5, y: y + 2, size: 7.5, font });

            // Draw column lines
            for (let i = 1; i < colXs.length; i++) {
                page.drawLine({
                    start: { x: colXs[i], y: y - 5 },
                    end: { x: colXs[i], y: y + rowHeight - 5 },
                    color: blackColor,
                    thickness: 1,
                });
            }
            
            y -= rowHeight;
        }

        y -= 30;

        // Instructions
        page.drawText("IMPORTANT INSTRUCTIONS", { x: margin, y, size: 10, font: fontBold });
        const iiWidth = fontBold.widthOfTextAtSize("IMPORTANT INSTRUCTIONS", 10);
        page.drawLine({ start: { x: margin, y: y - 2 }, end: { x: margin + iiWidth, y: y - 2 }, thickness: 1, color: blackColor });
        y -= 15;
        
        page.drawText("1. Candidate should carry this admit card and a valid university ID to the examination.", { x: margin, y, size: 8, font });
        y -= 15;
        page.drawText("2. Mobile phones and unauthorized electronic gadgets are strictly prohibited.", { x: margin, y, size: 8, font });
        y -= 15;
        page.drawText("3. Candidate should report to the examination center before the scheduled examination time.", { x: margin, y, size: 8, font });

        // Signatures
        y -= 70;
        
        page.drawLine({
            start: { x: margin, y: y + 15 },
            end: { x: margin + 100, y: y + 15 },
            thickness: 1,
            color: blackColor
        });
        page.drawText("Student Sign.", { x: margin + 20, y, size: 9, font: fontBold });
        
        const coeLabel = "Controller of Examinations";
        const coeW = fontBold.widthOfTextAtSize(coeLabel, 9);
        const rightLineStartX = pageWidth - margin - coeW - 20;
        
        page.drawLine({
            start: { x: rightLineStartX, y: y + 15 },
            end: { x: pageWidth - margin, y: y + 15 },
            thickness: 1,
            color: blackColor
        });
        page.drawText(coeLabel, { x: pageWidth - margin - coeW, y, size: 9, font: fontBold });
        
        y -= 30;
        page.drawText("Note: This is a Computer Generated Report", { 
            x: margin, 
            y, 
            size: 8, 
            font: fontBold, 
            color: rgb(0.4, 0.4, 0.4) 
        });

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

    private async generateResult(
        arguments_: Record<string, unknown>,
        context: ToolExecutionContext,
    ) {
        const { semester } = arguments_;

        if (typeof semester !== 'number' || !Number.isInteger(semester) || semester <= 0) {
            throw new BadRequestException('semester is required and must be a positive integer.');
        }

        if (context.role !== 'STUDENT') {
            throw new ForbiddenException('Only students can generate their own result document.');
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

        const semesterResult = await this.prisma.semesterResult.findFirst({
            where: {
                studentProfileId: authStudentProfile.id,
                semester: semester,
                institutionId: context.institutionId,
            },
            include: {
                subjects: {
                    orderBy: { courseCode: 'asc' },
                },
            },
        });

        if (!semesterResult) {
            throw new NotFoundException(`No result found for Semester ${semester}.`);
        }

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        let y = 800;
        const pageWidth = 595.28;
        const pageHeight = 841.89;
        const margin = 40;

        // Colors
        const redColor = rgb(0.7, 0.1, 0.1);
        const greyBg = rgb(0.95, 0.95, 0.95);
        const blackColor = rgb(0, 0, 0);

        // Header Background for Logo Area
        // Draw circular text/logo placeholder for Institution
        const logoRadius = 25;
        const logoX = margin + logoRadius;
        const logoY = y - logoRadius + 5;
        
        page.drawCircle({
            x: logoX,
            y: logoY,
            size: logoRadius,
            color: redColor,
        });
        
        const logoText = "NIYAM";
        const logoTextWidth = fontBold.widthOfTextAtSize(logoText, 12);
        page.drawText(logoText, { 
            x: logoX - (logoTextWidth / 2), 
            y: logoY - 4, 
            size: 12, 
            font: fontBold, 
            color: rgb(1, 1, 1) 
        });

        // Institution Header
        const instName = authStudentProfile.institution.name.toUpperCase();
        page.drawText(instName, { x: margin + 70, y: y - 10, size: 18, font: fontBold, color: rgb(0.1, 0.15, 0.4) });
        page.drawText("(Accredited by NAAC)", { x: margin + 70, y: y - 25, size: 9, font: fontBold, color: redColor });
        
        y -= 70;

        // Title
        page.drawRectangle({
            x: margin,
            y: y - 15,
            width: pageWidth - margin * 2,
            height: 20,
            color: blackColor
        });
        const docTitle = "SEMESTER GRADE SHEET";
        const titleWidth = fontBold.widthOfTextAtSize(docTitle, 12);
        page.drawText(docTitle, { 
            x: (pageWidth - titleWidth) / 2, 
            y: y - 10, 
            size: 12, 
            font: fontBold, 
            color: rgb(1, 1, 1) 
        });

        y -= 40;

        // Student Info Block
        const col1X = margin;
        const col2X = pageWidth / 2 + 20;
        const valOffset = 100;
        
        const examText = `SEMESTER ${semester} EXAMINATION`;
        page.drawText("EXAMINATION:", { x: col1X, y, size: 9, font: fontBold });
        page.drawText(examText, { x: col1X + valOffset, y, size: 9, font });

        page.drawText("REGD NO.:", { x: col2X, y, size: 9, font: fontBold });
        page.drawText(authStudentProfile.enrollmentNumber, { x: col2X + 60, y, size: 10, font: fontBold });
        
        y -= 15;
        page.drawText("COURSE/BRANCH:", { x: col1X, y, size: 9, font: fontBold });
        const progStr = authStudentProfile.program || "Not Available";
        page.drawText(progStr, { x: col1X + valOffset, y, size: 9, font });

        y -= 15;
        page.drawText("INSTITUTION:", { x: col1X, y, size: 9, font: fontBold });
        let instDisplay = instName;
        if (instDisplay.length > 30) instDisplay = instDisplay.substring(0, 27) + '...';
        page.drawText(instDisplay, { x: col1X + valOffset, y, size: 9, font });

        y -= 15;
        page.drawText("NAME:", { x: col1X, y, size: 9, font: fontBold });
        page.drawText(authStudentProfile.user.name, { x: col1X + valOffset, y, size: 10, font: fontBold });
        // Underline name
        const nameWidth = fontBold.widthOfTextAtSize(authStudentProfile.user.name, 10);
        page.drawLine({
            start: { x: col1X + valOffset, y: y - 2 },
            end: { x: col1X + valOffset + nameWidth, y: y - 2 },
            thickness: 1,
            color: blackColor
        });

        y -= 40;

        // Table
        // SL. NO. | COURSE CODE | SUBJECT DESCRIPTION | CREDITS | MARKS | GRADE
        const colWidths = [40, 80, 195, 60, 60, 80];
        const colXs = [margin];
        for (let i = 0; i < colWidths.length - 1; i++) {
            colXs.push(colXs[i] + colWidths[i]);
        }
        const tableWidth = pageWidth - margin * 2;
        const rowHeight = 22;

        const headers = ["SL. NO.", "COURSE CODE", "SUBJECT DESCRIPTION", "CREDITS", "MARKS", "GRADE"];
        
        // Header Row
        page.drawRectangle({
            x: margin,
            y: y - 5,
            width: tableWidth,
            height: rowHeight,
            color: greyBg,
            borderColor: blackColor,
            borderWidth: 1,
        });
        
        for (let i = 0; i < headers.length; i++) {
            const hWidth = fontBold.widthOfTextAtSize(headers[i], 8);
            const cx = colXs[i] + (colWidths[i] - hWidth) / 2;
            page.drawText(headers[i], { x: cx, y: y + 2, size: 8, font: fontBold, color: blackColor });
            
            if (i > 0) {
                page.drawLine({
                    start: { x: colXs[i], y: y - 5 },
                    end: { x: colXs[i], y: y + rowHeight - 5 },
                    color: blackColor,
                    thickness: 1,
                });
            }
        }
        y -= rowHeight;

        let totalCredits = 0;
        let index = 1;

        for (const subject of semesterResult.subjects) {
            totalCredits += subject.credits;

            page.drawRectangle({
                x: margin,
                y: y - 5,
                width: tableWidth,
                height: rowHeight,
                borderColor: blackColor,
                borderWidth: 1,
            });

            // SL NO (Centered)
            const slText = String(index++);
            const slW = font.widthOfTextAtSize(slText, 8);
            page.drawText(slText, { x: colXs[0] + (colWidths[0] - slW) / 2, y: y + 2, size: 8, font });

            // Course Code (Centered)
            const ccW = fontBold.widthOfTextAtSize(subject.courseCode, 8);
            page.drawText(subject.courseCode, { x: colXs[1] + (colWidths[1] - ccW) / 2, y: y + 2, size: 8, font: fontBold, color: rgb(0.1, 0.15, 0.4) });

            // Subject Name (Left, truncated)
            let subjectName = subject.courseName.toUpperCase();
            if (subjectName.length > 35) subjectName = subjectName.substring(0, 32) + '...';
            page.drawText(subjectName, { x: colXs[2] + 5, y: y + 2, size: 8, font });

            // Credits (Centered)
            const crText = subject.credits.toFixed(1);
            const crW = fontBold.widthOfTextAtSize(crText, 8);
            page.drawText(crText, { x: colXs[3] + (colWidths[3] - crW) / 2, y: y + 2, size: 8, font: fontBold });

            // Marks (Centered)
            const mkText = String(subject.marks);
            const mkW = fontBold.widthOfTextAtSize(mkText, 8);
            page.drawText(mkText, { x: colXs[4] + (colWidths[4] - mkW) / 2, y: y + 2, size: 8, font: fontBold });

            // Grade (Centered)
            const grW = fontBold.widthOfTextAtSize(subject.grade, 9);
            page.drawText(subject.grade, { x: colXs[5] + (colWidths[5] - grW) / 2, y: y + 2, size: 9, font: fontBold, color: rgb(0.1, 0.5, 0.2) });

            // Draw column lines
            for (let i = 1; i < colXs.length; i++) {
                page.drawLine({
                    start: { x: colXs[i], y: y - 5 },
                    end: { x: colXs[i], y: y + rowHeight - 5 },
                    color: blackColor,
                    thickness: 1,
                });
            }
            
            y -= rowHeight;
        }

        y -= 20;

        // Summary Box
        const summaryHeight = 25;
        page.drawRectangle({
            x: margin,
            y: y - summaryHeight + 5,
            width: tableWidth,
            height: summaryHeight,
            borderColor: blackColor,
            borderWidth: 1,
        });

        const sgpaStr = semesterResult.sgpa !== null ? Number(semesterResult.sgpa).toFixed(2) : "N/A";
        
        page.drawText("TOTAL EARNED CREDITS:", { x: margin + 10, y: y - 8, size: 9, font: fontBold });
        page.drawText(totalCredits.toFixed(1), { x: margin + 140, y: y - 8, size: 10, font: fontBold });

        // Middle divider
        page.drawLine({
            start: { x: pageWidth / 2, y: y - summaryHeight + 5 },
            end: { x: pageWidth / 2, y: y + 5 },
            color: blackColor,
            thickness: 1,
        });

        page.drawText("SEMESTER GRADE POINT AVERAGE (SGPA):", { x: (pageWidth / 2) + 10, y: y - 8, size: 9, font: fontBold });
        page.drawText(sgpaStr, { x: pageWidth - margin - 40, y: y - 8, size: 10, font: fontBold });

        // Footer / Signature
        y = 100;
        
        const coeLabel = "Controller of Examinations";
        const coeW = fontBold.widthOfTextAtSize(coeLabel, 10);
        
        page.drawLine({
            start: { x: pageWidth - margin - coeW - 20, y: y + 20 },
            end: { x: pageWidth - margin, y: y + 20 },
            thickness: 1,
            color: blackColor
        });
        
        page.drawText(coeLabel, { x: pageWidth - margin - coeW, y, size: 10, font: fontBold });

        page.drawText("Note: This is a Computer Generated Report", { 
            x: margin, 
            y: 50, 
            size: 8, 
            font: fontBold, 
            color: rgb(0.4, 0.4, 0.4) 
        });

        const pdfBytes = await pdfDoc.save();
        const buffer = Buffer.from(pdfBytes);

        const token = crypto.randomUUID();
        this.documentsService.storeDocument({
            token,
            buffer,
            userId: context.userId,
            institutionId: context.institutionId,
            documentType: 'RESULT',
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        });

        return {
            message: `Result document generated successfully.\n\n[Download Result](/api/documents/download/${token})`,
        };
    }
}
