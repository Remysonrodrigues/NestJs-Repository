import { 
    Body, 
    Controller, 
    ForbiddenException, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Param, 
    ParseIntPipe, 
    Post, 
    UseFilters 
} from '@nestjs/common';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { CatsService } from './cats.service'
import { Cat } from './interfaces/cat.interface'

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
export class CatsController {

    constructor(private catsService: CatsService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() createCatDto: CreateCatDto) {
        try {
            this.catsService.create(createCatDto);   
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }
    
    @Get()
    @HttpCode(200)
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) 
        id: number
    ) {        
        return this.catsService.findOne(id);
    }

}
