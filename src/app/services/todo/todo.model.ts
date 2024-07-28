export interface Todo {
  id?: number;
  name: string;
}

export class TodoItem implements Todo {
  id: number;
  list_id: number;
  name: string;
  description: string | null = null;
  tags: string[] = [];
  date: string | null = null;
  iscompleted: boolean = false;
}



export interface TodoList extends Todo {
  id: number;
  items: TodoItem[]
  userId: number;
}


export type CreateTodo = Partial<TodoItem>


