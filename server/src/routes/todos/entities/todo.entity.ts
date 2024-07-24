import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  name: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ array: true, type: 'varchar', default: [] })
  tags: string[];
  @Column({ type: 'date', nullable: true })
  date: string;
  @Column({ type: 'boolean', default: false })
  iscompleted: boolean;
  @Column({ type: 'integer' })
  list_id: number;
}
