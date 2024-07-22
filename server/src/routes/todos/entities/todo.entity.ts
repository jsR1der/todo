import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryColumn()
  id: number;
  @Column({ length: 50 })
  name: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ array: true, type: 'varchar', default: [] })
  tags: string[];
  @Column({ type: 'date', nullable: true })
  date: string;
  @Column('boolean')
  iscompleted: boolean;
}
