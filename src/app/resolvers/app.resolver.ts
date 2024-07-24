import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {TodoHttpService} from "../services/todo/todo-http.service";
import {TodoList} from "../services/todo/todo.model";

export const appResolver: ResolveFn<TodoList[]> = (route, state) => {
  const todoHttpService = inject(TodoHttpService)
  return todoHttpService.getLists();
};
