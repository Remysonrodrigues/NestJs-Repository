import { 
    Body, 
    Controller, 
    DefaultValuePipe, 
    ForbiddenException, 
    Get, 
    HttpCode,     
    Param,     
    ParseBoolPipe,     
    Post, 
    Query, 
    UseFilters,
    UseInterceptors
} from '@nestjs/common';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { ParseIntPipe } from 'src/validations/parse-int.pipe';
import { ValidationPipe } from 'src/validations/validation.pipe';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
export class CatsController {

    constructor(private catsService: CatsService) {}

    @Post()
    @HttpCode(201)
    @Roles('admin')
    async create(
        @Body(new ValidationPipe()) createCatDto: CreateCatDto
    ) {
        try {
            this.catsService.create(createCatDto);   
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }
    
    @Get()
    @HttpCode(200)
    async findAll(
        @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    ): Promise<Cat[]> {
        return this.catsService.findAll({ activeOnly, page });
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id', new ParseIntPipe()) id: number) {        
        return this.catsService.findOne(id);
    }

}
