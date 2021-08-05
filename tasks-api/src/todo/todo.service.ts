import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import { toTodoDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import * as uuid from 'uuid';
import { TodoCreateDto } from './dto/todo-create.dto';
import { TodoListDto } from './dto/todo-list.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {

    todos: TodoEntity[] = todos;

    async getOneTodo(id: string): Promise<TodoDto> {
        
        const todo = this.todos.find(todo => todo.id === id);

        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }

        return toPromise(toTodoDto(todo));

    }

    async getAllTodo(): Promise<TodoListDto> {

        let todoAll: TodoListDto; 

        todoAll.todos = [...this.todos.map(todo => toTodoDto(todo))];

        return todoAll;

    }

    async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {

        const { name, description } = todoDto

        const todo: TodoEntity = {
            id: uuid(),
            name,
            description,
        };

        this.todos.push(todo);
        return toPromise(toTodoDto(todo));

    }

    async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {

        const { name, description } = todoDto;
        
        const todo = this.todos.find(todo => todo.id === id);

        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }

        this.todos.map(todo => { 
            if (todo.id === id) {
                todo.name = name;
                todo.description = description!;
            }
        });

        return toPromise(toTodoDto(this.todos.find(todo => todo.id === id)));

    }

    async destroyTodo(id: string): Promise<TodoDto> {

        const todo = this.todos.find(todo => todo.id === id);

        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }

        this.todos.splice(this.todos.indexOf(todo), 1);

        return toPromise(toTodoDto(todo));

    }

}
