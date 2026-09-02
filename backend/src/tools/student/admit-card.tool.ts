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
export class AdmitCardTool extends InstitutionalTool {
  readonly name = 'AdmitCardTool';

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
        'Official examination admit card and hall ticket management tool.',
      operations: [
        {
          operation: 'view_admit_card',
          description:
            'View midsem/endsem examination admit card and seat allocations.',
          requiredRole: ['STUDENT', 'FACULTY', 'ADMIN'],
          parameters: {
            studentId: {
              type: 'string',
              required: false,
              description: 'Student ID or Enrollment Number',
            },
          },
          riskLevel: 'LOW',
          auditEventName: 'ADMIT_CARD_VIEWED',
        },
        {
          operation: 'download_admit_card',
          description: 'Download PDF examination admit card.',
          requiredRole: ['STUDENT', 'FACULTY', 'ADMIN'],
          parameters: {
            studentId: {
              type: 'string',
              required: false,
              description: 'Student ID or Enrollment Number',
            },
          },
          riskLevel: 'LOW',
          auditEventName: 'ADMIT_CARD_DOWNLOADED',
        },
        {
          operation: 'print_admit_card',
          description: 'Generate browser print-ready admit card layout.',
          requiredRole: ['STUDENT', 'FACULTY', 'ADMIN'],
          parameters: {
            studentId: {
              type: 'string',
              required: false,
              description: 'Student ID or Enrollment Number',
            },
          },
          riskLevel: 'LOW',
          auditEventName: 'ADMIT_CARD_PRINTED',
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
              reason: 'Student attempted to access another student admit card.',
            },
          },
        );

        throw new ForbiddenException(
          'You are not authorized to access admit cards of other students.',
        );
      }
    }

    // Statutory Attendance Policy Enforcement (Rule CLASS-001 / EXM-001):
    // Students with aggregate attendance below 75.0% are strictly ineligible for exam admit cards.
    try {
      const attendance = await this.mockErp.getAttendance(
        targetStudentId,
        context.institutionId,
      );

      if (attendance && attendance.overallPercentage < 75.0) {
        await this.auditService.record(
          context.institutionId,
          context.requestId,
          AuditEventType.ACTION_EXECUTION_FAILED,
          {
            metadata: {
              tool: this.name,
              operation,
              targetStudentId,
              eventAction: 'ADMIT_CARD_WITHHELD_SHORT_ATTENDANCE',
              overallPercentage: attendance.overallPercentage,
              requiredPercentage: 75.0,
              policyId: 'CLASS-001',
              reason: `Admit card withheld: Aggregate attendance ${attendance.overallPercentage}% is below the mandatory 75% threshold under policy CLASS-001 / EXM-001.`,
            },
          },
        );

        return {
          action: 'withheld',
          eligible: false,
          status: 'SHORT_ATTENDANCE',
          overallPercentage: attendance.overallPercentage,
          requiredPercentage: 75.0,
          studentName: attendance.studentName,
          registrationNo: attendance.registrationNo,
          policyViolation: 'CLASS-001 / EXM-001',
          message: `Admit Card Withheld: Your aggregate attendance is ${attendance.overallPercentage}%, which is below the mandatory 75.0% requirement under institutional policy CLASS-001. Examination hall ticket is withheld due to shortage of attendance.`,
          admitCard: null,
          timestamp: new Date().toISOString(),
        };
      }
    } catch (attendanceErr) {
      // If attendance record cannot be resolved, fallback to standard admit card check
    }

    const admitCardData = await this.mockErp.getAdmitCard(
      targetStudentId,
      context.institutionId,
    );

    let auditEventName = 'ADMIT_CARD_VIEWED';
    let responseAction = 'view';

    switch (operation) {
      case 'view_admit_card':
      case 'view':
        auditEventName = 'ADMIT_CARD_VIEWED';
        responseAction = 'view';
        break;
      case 'download_admit_card':
      case 'download':
        auditEventName = 'ADMIT_CARD_DOWNLOADED';
        responseAction = 'download';
        break;
      case 'print_admit_card':
      case 'print':
        auditEventName = 'ADMIT_CARD_PRINTED';
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
          registrationNo: admitCardData.registrationNo,
          studentName: admitCardData.studentName,
          examinationName: admitCardData.examinationName,
          totalExams: admitCardData.schedule.length,
          riskLevel: 'LOW',
          status: 'SUCCESS',
        },
      },
    );

    return {
      action: responseAction,
      admitCard: admitCardData,
      downloadUrl: `/api/tools/admit-card/${admitCardData.registrationNo}/download`,
      printUrl: `/api/tools/admit-card/${admitCardData.registrationNo}/print`,
      timestamp: new Date().toISOString(),
    };
  }
}
