import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { UserLoginDto } from 'src/users/dto/user-login.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService    
    ) {}

    async register(userDto: UserCreateDto): Promise<RegistrationStatus> {

        let status: RegistrationStatus = {
            success: true,
            message: 'user registered'
        };
        
        try {
            
            await this.userService.create(userDto);

        } catch (err) {
            status = {
                success: false,
                message: err
            }
        }

        return status;

    }

    async login(loginUserDto: UserLoginDto): Promise<LoginStatus> {

        const user = await this.userService.findByLogin(loginUserDto);

        const token = this._createToken(user);

        return {
            username: user.username,
            ...token
        };
        
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {

        const user = await this.userService.findByPayload(payload);

        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return user;

    }

    private _createToken({ username }: UserDto): any {

        const user: JwtPayload = { username };
        
        const accessToken = this.jwtService.sign(user);

        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken
        };

    }

}
