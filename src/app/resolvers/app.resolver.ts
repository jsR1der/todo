import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {TodoHttpService} from "../services/todo/todo-http.service";
import {TodoGroup, TodoList} from "../services/todo/todo.model";
import {forkJoin, map} from "rxjs";

export const appResolver: ResolveFn<{ lists: TodoList[], groups: Record<string, TodoGroup> }> = (route, state) => {
  const todoHttpService = inject(TodoHttpService)
  return forkJoin([todoHttpService.getLists(), todoHttpService.getGroups()]).pipe(map(([lists, groups]) => ({
    lists, groups
  })))
};
