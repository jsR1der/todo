import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { TodoList } from './entities/todo-list.entity';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
  ) {}

  public async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  public async createList(createTodoDto: CreateTodoListDto) {
    const todo = this.todoListRepository.create(createTodoDto);
    return this.todoListRepository.save(todo);
  }

  public async findAll() {
    return await this.todoRepository.find();
  }

  public async getAllLists() {
    const lists = await this.todoListRepository.find({
      order: {
        id: 'ASC',
      },
    });

    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      lists[i].items = await this.todoRepository.find({
        where: { list_id: list.id, iscompleted: false },
        order: { id: 'ASC' },
      });
    }
    return lists;
  }

  public async findOne(id: number) {
    return await this.todoRepository.findOneBy({ id });
  }

  public async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.todoRepository.update(id, updateTodoDto);
  }

  public async updateList(id: number, updateTodoDto: UpdateTodoListDto) {
    return await this.todoListRepository.update(id, updateTodoDto);
  }

  public async remove(id: number) {
    return this.todoRepository.delete({ id });
  }

  public async removeList(id: number) {
    await this.todoRepository.delete({ list_id: id });
    return this.todoListRepository.delete({ id });
  }
}
