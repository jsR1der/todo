import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../auth/auth.service';
import { TodoList } from './entities/todo-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoList, User])],
  controllers: [TodosController],
  providers: [
    TodosService,
    UsersService,
    JwtService,
    ConfigService,
    UsersService,
    AuthService,
  ],
})
export class TodosModule {}
