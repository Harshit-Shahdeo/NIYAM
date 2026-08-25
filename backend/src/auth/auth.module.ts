import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';

@Module({
    imports: [
        DatabaseModule,

        PassportModule,

        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '1d',
            },
        }),
    ],

    controllers: [AuthController],

    providers: [AuthService, JwtStrategy, RolesGuard],

    exports: [AuthService, JwtModule, RolesGuard],
})
export class AuthModule { }