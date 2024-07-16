export interface ExpansionList {
  name: string;
  todoList: TodoItem[];
}

export interface TodoItem {
  id?: number;
  isCompleted: boolean
  title: string;
  description: string;
  tags: string[];
  date: string;

}
