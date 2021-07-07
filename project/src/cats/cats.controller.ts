import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { CreateCatDto } from 'src/dto/create-cat.dto';
import { CatsService } from './cats.service'
import { Cat } from '../interfaces/cat.interface'

@Controller('cats')
export class CatsController {

    constructor(private catsService: CatsService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }
    
    @Get()
    @HttpCode(200)
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id') id: string): string {        
        return `This action returns a #${id} cat`;
    }

}
