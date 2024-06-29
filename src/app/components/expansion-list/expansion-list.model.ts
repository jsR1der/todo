export interface ExpansionList {
  name: string;
  todoList: TodoItem[];
}

export interface TodoItem {
  isCompleted: boolean
  title: string;
  description: string;
  tags: string[];
  date: string;

}
