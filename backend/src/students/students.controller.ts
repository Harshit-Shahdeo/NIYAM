import {
    Controller,
    Get,
    Param,
    Req,
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { StudentsService } from './students.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        institutionId: string;
        role: string;
    };
}

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
    constructor(
        private readonly studentsService: StudentsService,
    ) { }

    @Get('me')
    @Roles('STUDENT')
    async getMyProfile(
        @Req() request: AuthenticatedRequest,
    ) {
        const user = request.user;

        return this.studentsService.getMyStudentProfile(
            user.userId,
            user.institutionId,
        );
    }

    @Get(':id')
    @Roles('FACULTY', 'ADMIN')
    async getStudentProfile(
        @Param('id') studentId: string,
        @Req() request: AuthenticatedRequest,
    ) {
        const user = request.user;

        return this.studentsService.getStudentProfile(
            studentId,
            user.institutionId,
        );
    }
}