import {FormControl} from "@angular/forms";
import {TodoItem} from "../../services/todo/todo.model";

export type TodoFormModel = Record<keyof Omit<TodoItem, 'list_id' | 'id'>, FormControl<unknown>>


export class UpdateTodoAdapter {
  public output: TodoItem;
  constructor(old: TodoItem,update: Partial<TodoItem>) {
    this.output = {...old,...update};
    this.output.date = update.date ? update.date : null;
    this.output.description = update.description ? update.description : null;
  }
}
