import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './todo.entity';

@Entity({ name: 'todo_lists' })
export class TodoList {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  name: string;
  @Column({ type: 'integer' })
  user_id: number;
  items?: Todo[] = [];
  count?: number;
}
