export interface Todo {
  id?: number;
  name: string;
}

export interface TodoItem extends Todo {
  description: string;
  tags: string[];
  date: string;
  iscompleted: boolean;
  list_id: number;

}

export interface TodoList extends Todo {
  items: TodoItem[]
  userId: number;
}


export type CreateTodo = Partial<TodoItem>


