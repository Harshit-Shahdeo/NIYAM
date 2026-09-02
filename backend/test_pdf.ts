import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as fs from 'fs';

async function generate() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
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
    y -= 40;

    const examTitle = `SEMESTER 5 EXAMINATION`;
    const examTitleWidth = fontBold.widthOfTextAtSize(examTitle, 12);
    page.drawText(examTitle, { x: (pageWidth - examTitleWidth) / 2, y, size: 12, font: fontBold, color: rgb(0, 0, 0) });
    y -= 25;

    const admitCard = "ADMIT CARD";
    const admitCardWidth = fontBold.widthOfTextAtSize(admitCard, 14);
    page.drawText(admitCard, { x: (pageWidth - admitCardWidth) / 2, y, size: 14, font: fontBold, color: rgb(0, 0, 0) });
    y -= 40;

    // Student Info
    const infoX = margin;
    const valX = margin + 120;
    const lineSpacing = 20;

    page.drawText("REGISTRATION NO", { x: infoX, y, size: 10, font: fontBold });
    page.drawText(`: NIYAM2026001`, { x: valX, y, size: 10, font });
    y -= lineSpacing;

    page.drawText("STUDENT NAME", { x: infoX, y, size: 10, font: fontBold });
    page.drawText(`: HARSHIT SHAHDEO`, { x: valX, y, size: 10, font });
    y -= lineSpacing;

    page.drawText("PROGRAM", { x: infoX, y, size: 10, font: fontBold });
    page.drawText(`: BACHELOR OF TECHNOLOGY`, { x: valX, y, size: 10, font });
    y -= lineSpacing;

    page.drawText("BRANCH", { x: infoX, y, size: 10, font: fontBold });
    page.drawText(`: COMPUTER SCIENCE AND ENGINEERING`, { x: valX, y, size: 10, font });
    y -= 40;

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

    const mockData = [
        ["5", "FMI301 -- Fundamental Machine Intelligence", "15-Nov-2026", "10:00 AM - 01:00 PM", "Hall A, Main Block"],
        ["5", "IML302 -- Introduction to Machine Learning", "16-Nov-2026", "10:00 AM - 01:00 PM", "Hall A, Main Block"],
    ];

    for (const row of mockData) {
        page.drawRectangle({
            x: margin,
            y: y - 5,
            width: tableWidth,
            height: rowHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
        });

        for (let i = 0; i < row.length; i++) {
            let text = row[i];
            // Truncate if necessary (simplified)
            if (i === 1 && text.length > 35) text = text.substring(0, 35) + '...';
            if (i === 4 && text.length > 18) text = text.substring(0, 18) + '...';

            page.drawText(text, {
                x: colXs[i] + 5,
                y: y + 5,
                size: 8,
                font,
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
    }

    y -= 40;

    page.drawText("Note :- 1. Students must carry their admit card and valid university ID during the examination.", { x: margin, y, size: 8, font });
    y -= 15;
    page.drawText("Note :- 2. Mobile phones and unauthorized electronic gadgets are not permitted during the examination.", { x: margin, y, size: 8, font });
    y -= 15;
    page.drawText("Note :- 3. Students should report to the examination center before the scheduled examination time.", { x: margin, y, size: 8, font });

    y = 100;
    page.drawText("Student Sign.", { x: margin, y, size: 10, font });
    const rightAlign = pageWidth - margin - font.widthOfTextAtSize("Controller of Examination", 10);
    page.drawText("Controller of Examination", { x: rightAlign, y, size: 10, font });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('test.pdf', pdfBytes);
}

generate().catch(console.error);
