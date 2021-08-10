import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { UserLoginDto } from 'src/users/dto/user-login.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(@Body() createUserDto: UserCreateDto): Promise<RegistrationStatus> {

        const result: RegistrationStatus = await this.authService.register(createUserDto);

        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }

        return result;

    } 

    @Post('login')
    public async login(@Body() loginUserDto: UserLoginDto): Promise<LoginStatus> {

        return await this.authService.login(loginUserDto);

    }

}
