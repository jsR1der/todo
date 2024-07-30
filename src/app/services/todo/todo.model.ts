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


export class TodoList implements Todo {
  id: number;
  userId: number;
  name: string = '';
  items: TodoItem[] = []
  count: number = 0;
}

export type TodoGroup = { items: TodoItem[], count: number }


export type CreateTodo = Partial<TodoItem>


