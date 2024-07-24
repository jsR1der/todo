export interface ExpansionList {
  id: number;
  name: string;
  user_id: number;
  items: TodoItem[];
}

export interface TodoItem {
  id?: number;
  isCompleted: boolean
  title: string;
  description: string;
  tags: string[];
  date: string;

}
