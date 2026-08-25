import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get('admin-test')
    adminTest() {
        return {
            message: 'You have ADMIN access',
        };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('FACULTY', 'ADMIN')
    @Get('faculty-test')
    facultyTest() {
        return {
            message: 'You have FACULTY or ADMIN access',
        };
    }
}