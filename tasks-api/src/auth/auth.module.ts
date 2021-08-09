import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

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
    controllers: [],
    providers: [],
    exports: [
        PassportModule,
        JwtModule
    ]
})
export class AuthModule {}
