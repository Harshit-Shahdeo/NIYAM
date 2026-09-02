import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuditEventType } from '@prisma/client';
import { AuditService } from '../../audit/audit.service';
import { InstitutionalTool, ToolMetadata } from '../institutional-tools';
import { MockErpService } from '../mock-erp/mock-erp.service';
import { ToolExecutionContext } from '../tool-execution-context';

@Injectable()
export class AttendanceTool extends InstitutionalTool {
  readonly name = 'AttendanceTool';

  constructor(
    private readonly mockErp: MockErpService,
    private readonly auditService: AuditService,
  ) {
    super();
  }

  getMetadata(): ToolMetadata {
    return {
      name: this.name,
      description:
        'Per-subject academic attendance and exam eligibility calculator tool.',
      operations: [
        {
          operation: 'view_attendance',
          description:
            'View overall and per-subject attendance stats and exam eligibility status.',
          requiredRole: ['STUDENT', 'FACULTY', 'ADMIN'],
          parameters: {
            studentId: {
              type: 'string',
              required: false,
              description: 'Student ID or Enrollment Number',
            },
          },
          riskLevel: 'LOW',
          auditEventName: 'ATTENDANCE_VIEWED',
        },
        {
          operation: 'download_attendance',
          description: 'Download PDF attendance breakdown report.',
          requiredRole: ['STUDENT', 'FACULTY', 'ADMIN'],
          parameters: {
            studentId: {
              type: 'string',
              required: false,
              description: 'Student ID or Enrollment Number',
            },
          },
          riskLevel: 'LOW',
          auditEventName: 'ATTENDANCE_DOWNLOADED',
        },
        {
          operation: 'print_attendance',
          description: 'Generate browser print-ready attendance summary sheet.',
          requiredRole: ['STUDENT', 'FACULTY', 'ADMIN'],
          parameters: {
            studentId: {
              type: 'string',
              required: false,
              description: 'Student ID or Enrollment Number',
            },
          },
          riskLevel: 'LOW',
          auditEventName: 'ATTENDANCE_PRINTED',
        },
      ],
    };
  }

  async execute(
    operation: string,
    arguments_: Record<string, unknown>,
    context: ToolExecutionContext,
  ): Promise<unknown> {
    const rawStudentId =
      typeof arguments_.studentId === 'string' &&
      arguments_.studentId.trim().length > 0
        ? arguments_.studentId.trim()
        : context.userId;

    const targetStudentId =
      rawStudentId === 'me' || rawStudentId === 'my'
        ? context.userId
        : rawStudentId;

    // RBAC Security Enforcement: Students can ONLY access their own records
    if (context.role === 'STUDENT') {
      const targetKey = await this.mockErp.resolveStudentKey(
        targetStudentId,
        context.institutionId,
      );
      const myKey = await this.mockErp.resolveStudentKey(
        context.userId,
        context.institutionId,
      );

      if (targetKey !== myKey) {
        await this.auditService.record(
          context.institutionId,
          context.requestId,
          AuditEventType.ACTION_EXECUTION_FAILED,
          {
            metadata: {
              tool: this.name,
              operation,
              targetStudentId,
              actorUserId: context.userId,
              eventAction: 'UNAUTHORIZED_TOOL_ACCESS_ATTEMPT',
              reason: 'Student attempted to access another student attendance.',
            },
          },
        );

        throw new ForbiddenException(
          'You are not authorized to view attendance of other students.',
        );
      }
    }

    const attendanceData = await this.mockErp.getAttendance(
      targetStudentId,
      context.institutionId,
    );

    let auditEventName = 'ATTENDANCE_VIEWED';
    let responseAction = 'view';

    switch (operation) {
      case 'view_attendance':
      case 'view':
        auditEventName = 'ATTENDANCE_VIEWED';
        responseAction = 'view';
        break;
      case 'download_attendance':
      case 'download':
        auditEventName = 'ATTENDANCE_DOWNLOADED';
        responseAction = 'download';
        break;
      case 'print_attendance':
      case 'print':
        auditEventName = 'ATTENDANCE_PRINTED';
        responseAction = 'print';
        break;
      default:
        throw new BadRequestException(
          `Unsupported operation '${operation}' for ${this.name}`,
        );
    }

    await this.auditService.record(
      context.institutionId,
      context.requestId,
      AuditEventType.ACTION_EXECUTED,
      {
        metadata: {
          tool: this.name,
          operation,
          eventAction: auditEventName,
          registrationNo: attendanceData.registrationNo,
          studentName: attendanceData.studentName,
          overallPercentage: attendanceData.overallPercentage,
          overallStatus: attendanceData.overallStatus,
          riskLevel: 'LOW',
          status: 'SUCCESS',
        },
      },
    );

    return {
      action: responseAction,
      attendance: attendanceData,
      downloadUrl: `/api/tools/attendance/${attendanceData.registrationNo}/download`,
      printUrl: `/api/tools/attendance/${attendanceData.registrationNo}/print`,
      timestamp: new Date().toISOString(),
    };
  }
}
