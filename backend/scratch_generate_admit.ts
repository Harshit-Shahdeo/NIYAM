import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DocumentTool } from './src/tools/document/document.tool';
import { PrismaService } from './src/database/prisma.service';
import * as fs from 'fs';
import { DocumentsService } from './src/documents/documents.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const prisma = app.get(PrismaService);
  const documentTool = app.get(DocumentTool);
  const documentsService = app.get(DocumentsService);

  const student = await prisma.user.findFirst({
    where: { role: 'STUDENT' },
    include: { studentProfile: true }
  });

  if (!student || !student.studentProfile) {
    console.log("No student found");
    return;
  }

  const context = {
    userId: student.id,
    institutionId: student.institutionId,
    role: 'STUDENT',
    token: 'mock-token',
    userEmail: student.email,
  };

  const args = {
    semester: 5,
  };

  console.log("Generating admit card for semester:", args.semester);

  const result: any = await documentTool.execute('GENERATE_ADMIT_CARD', args, context as any);

  const tokenMatch = result.message.match(/download\/([a-zA-Z0-9-]+)/);
  if (tokenMatch) {
      const token = tokenMatch[1];
      const pdfBuffer = documentsService.consume(token);
      fs.writeFileSync('test_admit_card.pdf', pdfBuffer);
      console.log("PDF saved to test_admit_card.pdf");
  }

  await app.close();
}

bootstrap();
