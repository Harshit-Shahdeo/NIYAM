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
export class StudentResultTool extends InstitutionalTool {
  readonly name = 'StudentResultTool';

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
        'Official academic grade sheet and semester result management tool.',
      operations: [
        {
          operation: 'view_result',
          description: 'View semester grade sheet and SGPA/CGPA records.',
          requiredRole: ['STUDENT', 'FACULTY', 'ADMIN'],
          parameters: {
            studentId: {
              type: 'string',
              required: false,
              description: 'Student ID or Enrollment Number',
            },
          },
          riskLevel: 'LOW',
          auditEventName: 'STUDENT_RESULT_VIEWED',
        },
        {
          operation: 'download_result',
          description: 'Download printable PDF semester grade sheet.',
          requiredRole: ['STUDENT', 'FACULTY', 'ADMIN'],
          parameters: {
            studentId: {
              type: 'string',
              required: false,
              description: 'Student ID or Enrollment Number',
            },
          },
          riskLevel: 'LOW',
          auditEventName: 'STUDENT_RESULT_DOWNLOADED',
        },
        {
          operation: 'print_result',
          description: 'Generate browser print-ready grade sheet layout.',
          requiredRole: ['STUDENT', 'FACULTY', 'ADMIN'],
          parameters: {
            studentId: {
              type: 'string',
              required: false,
              description: 'Student ID or Enrollment Number',
            },
          },
          riskLevel: 'LOW',
          auditEventName: 'STUDENT_RESULT_PRINTED',
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
              reason: 'Student attempted to access another student result.',
            },
          },
        );

        throw new ForbiddenException(
          'You are not authorized to view academic results of other students.',
        );
      }
    }

    const resultData = await this.mockErp.getStudentResult(
      targetStudentId,
      context.institutionId,
    );

    let auditEventName = 'STUDENT_RESULT_VIEWED';
    let responseAction = 'view';

    switch (operation) {
      case 'view_result':
      case 'view':
        auditEventName = 'STUDENT_RESULT_VIEWED';
        responseAction = 'view';
        break;
      case 'download_result':
      case 'download':
        auditEventName = 'STUDENT_RESULT_DOWNLOADED';
        responseAction = 'download';
        break;
      case 'print_result':
      case 'print':
        auditEventName = 'STUDENT_RESULT_PRINTED';
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
          registrationNo: resultData.registrationNo,
          studentName: resultData.studentName,
          sgpa: resultData.sgpa,
          cgpa: resultData.cgpa,
          overallResult: resultData.overallResult,
          riskLevel: 'LOW',
          status: 'SUCCESS',
        },
      },
    );

    return {
      action: responseAction,
      result: resultData,
      downloadUrl: `/api/tools/student-result/${resultData.registrationNo}/download`,
      printUrl: `/api/tools/student-result/${resultData.registrationNo}/print`,
      timestamp: new Date().toISOString(),
    };
  }
}
