import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { PrismaService } from '../database/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ToolExecutionContext } from './tool-execution-context';
import { ToolRegistry } from './tool-registry';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    institutionId: string;
    role: string;
  };
}

@Controller('tools')
@UseGuards(JwtAuthGuard)
export class ToolsController {
  constructor(
    private readonly toolRegistry: ToolRegistry,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getTools() {
    return {
      tools: this.toolRegistry.getAllMetadata(),
      count: this.toolRegistry.getAllMetadata().length,
    };
  }

  private async buildContext(
    req: AuthenticatedRequest,
    toolName: string,
    action: string,
  ): Promise<ToolExecutionContext> {
    const externalId = `tool-rest-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const serviceRequest = await this.prisma.serviceRequest.create({
      data: {
        externalId,
        institutionId: req.user.institutionId,
        userId: req.user.userId,
        message: `Direct execution of ${toolName}:${action}`,
        status: 'PROCESSING',
      },
    });

    return {
      userId: req.user.userId,
      institutionId: req.user.institutionId,
      role: req.user.role,
      requestId: serviceRequest.id,
    };
  }

  // === STUDENT RESULT ENDPOINTS ===
  @Get('student-result/:studentId')
  async viewResult(
    @Param('studentId') studentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const ctx = await this.buildContext(
      req,
      'StudentResultTool',
      'view_result',
    );
    return this.toolRegistry.execute(
      'StudentResultTool',
      'view_result',
      { studentId },
      ctx,
    );
  }

  @Get('student-result/:studentId/download')
  async downloadResult(
    @Param('studentId') studentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const ctx = await this.buildContext(
      req,
      'StudentResultTool',
      'download_result',
    );
    return this.toolRegistry.execute(
      'StudentResultTool',
      'download_result',
      { studentId },
      ctx,
    );
  }

  @Get('student-result/:studentId/print')
  async printResult(
    @Param('studentId') studentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const ctx = await this.buildContext(
      req,
      'StudentResultTool',
      'print_result',
    );
    return this.toolRegistry.execute(
      'StudentResultTool',
      'print_result',
      { studentId },
      ctx,
    );
  }

  // === ADMIT CARD ENDPOINTS ===
  @Get('admit-card/:studentId')
  async viewAdmitCard(
    @Param('studentId') studentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const ctx = await this.buildContext(
      req,
      'AdmitCardTool',
      'view_admit_card',
    );
    return this.toolRegistry.execute(
      'AdmitCardTool',
      'view_admit_card',
      { studentId },
      ctx,
    );
  }

  @Get('admit-card/:studentId/download')
  async downloadAdmitCard(
    @Param('studentId') studentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const ctx = await this.buildContext(
      req,
      'AdmitCardTool',
      'download_admit_card',
    );
    return this.toolRegistry.execute(
      'AdmitCardTool',
      'download_admit_card',
      { studentId },
      ctx,
    );
  }

  @Get('admit-card/:studentId/print')
  async printAdmitCard(
    @Param('studentId') studentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const ctx = await this.buildContext(
      req,
      'AdmitCardTool',
      'print_admit_card',
    );
    return this.toolRegistry.execute(
      'AdmitCardTool',
      'print_admit_card',
      { studentId },
      ctx,
    );
  }

  // === ATTENDANCE ENDPOINTS ===
  @Get('attendance/:studentId')
  async viewAttendance(
    @Param('studentId') studentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const ctx = await this.buildContext(
      req,
      'AttendanceTool',
      'view_attendance',
    );
    return this.toolRegistry.execute(
      'AttendanceTool',
      'view_attendance',
      { studentId },
      ctx,
    );
  }

  @Get('attendance/:studentId/download')
  async downloadAttendance(
    @Param('studentId') studentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const ctx = await this.buildContext(
      req,
      'AttendanceTool',
      'download_attendance',
    );
    return this.toolRegistry.execute(
      'AttendanceTool',
      'download_attendance',
      { studentId },
      ctx,
    );
  }

  @Get('attendance/:studentId/print')
  async printAttendance(
    @Param('studentId') studentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const ctx = await this.buildContext(
      req,
      'AttendanceTool',
      'print_attendance',
    );
    return this.toolRegistry.execute(
      'AttendanceTool',
      'print_attendance',
      { studentId },
      ctx,
    );
  }
}
