import {TodoList} from "../../services/todo/todo.model";
import {FormControl} from "@angular/forms";

export type CreateTodoListForm = Record<keyof Pick<TodoList, 'name'>, FormControl<string>>
