import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const { institutionCode, email, password } = loginDto;

        // Find the institution first
        const institution = await this.prisma.institution.findUnique({
            where: {
                code: institutionCode,
            },
        });

        if (!institution) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Find the user within that institution
        const user = await this.prisma.user.findUnique({
            where: {
                institutionId_email: {
                    institutionId: institution.id,
                    email,
                },
            },
            include: {
                department: true,
            },
        });

        if (!user || !user.isActive) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Compare entered password with stored bcrypt hash
        const passwordMatches = await bcrypt.compare(
            password,
            user.passwordHash,
        );

        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            institutionId: user.institutionId,
            role: user.role,
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                institutionId: user.institutionId,
                department: user.department
                    ? {
                        id: user.department.id,
                        name: user.department.name,
                        code: user.department.code,
                    }
                    : null,
            },
        };
    }
}