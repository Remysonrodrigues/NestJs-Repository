import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from '@shared/mapper';
import { comparePasswords } from '@shared/utils';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ) {}

    async findOne(options?: object): Promise<UserDto> {

        const user = await this.userRepo.findOne(options);

        return toUserDto(user);
    }

    async findByLogin({ username, password }: UserLoginDto): Promise<UserDto> {

        const user = await this.userRepo.findOne({ where: { username } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const areEqual = await comparePasswords(user.password, password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    
    }

    async findByPayload({ username }: any): Promise<UserDto> {

        return await this.findOne({ where: { username } });

    }


    async create(userDto: UserCreateDto): Promise<UserDto> {

        const { username, email, password } = userDto;

        const userInDb = await this.findOne({ where: { username } });

        if (!userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: UserEntity = await this.userRepo.create({ username, password, email });

        await this.userRepo.save(user);

        return toUserDto(user);

    }

}
