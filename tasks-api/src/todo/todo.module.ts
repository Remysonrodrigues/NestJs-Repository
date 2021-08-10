import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/users/entity/user.entity';
import { UsersModule } from 'src/users/users.module';
import { TaskEntity } from './entity/task.entity';
import { TodoEntity } from './entity/todo.entity';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([TodoEntity, TaskEntity, UserEntity])
  ],
  controllers: [TodoController, TaskController],
  providers: [TodoService, TaskService]
})
export class TodoModule {}
