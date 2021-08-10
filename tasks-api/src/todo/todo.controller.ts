import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { toPromise } from '@shared/utils';
import { UserDto } from 'src/users/dto/user.dto';
import { TodoCreateDto } from './dto/todo-create.dto';
import { TodoListDto } from './dto/todo-list.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('api/todos')
export class TodoController {

    constructor(private readonly todoService: TodoService) {}

    @Get()
    async findAll(): Promise<TodoListDto> {

        const todos = await this.todoService.getAllTodo();

        return toPromise({ todos });

    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<TodoDto> {

        return await this.todoService.getOneTodo(id);

    }

    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(new ValidationPipe())
    async create(@Body() todoCreateDto: TodoCreateDto, @Req() req: any, ): Promise<TodoDto> {

        const user = <UserDto>req.user;

        return await this.todoService.createTodo(user, todoCreateDto);

    }

    @Put(':id')
    @UseGuards(AuthGuard())
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() todoDto: TodoDto): Promise<TodoDto> {

        return await this.todoService.updateTodo(id, todoDto);

    }

    @Delete('id')
    @UseGuards(AuthGuard())
    async destroy(@Param('id') id: string): Promise<TodoDto> {

        return await this.todoService.destroyTodo(id);

    }
}
