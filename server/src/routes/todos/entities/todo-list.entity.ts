import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'todo_lists' })
export class TodoList {
  @PrimaryColumn()
  id: number;
  @Column({ length: 50 })
  name: string;
}
