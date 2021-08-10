import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false
        }),
        JwtModule.register({
            secret: process.env.SECRETKEY, 
            signOptions: {
                expiresIn: process.env.EXPIRESIN
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [
        PassportModule,
        JwtModule
    ]
})
export class AuthModule {}
