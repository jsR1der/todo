import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateTodo, TodoGroup, TodoItem, TodoList} from "./todo.model";
import {AuthHttpService} from "../../pages/auth/auth-http.service";

@Injectable({
  providedIn: 'root'
})
export class TodoHttpService {
  private readonly baseUrl = 'http://localhost:3000/todos'

  constructor(private readonly httpClient: HttpClient, private readonly authHttpService: AuthHttpService) {
  }

  public createTodo(body: CreateTodo): Observable<TodoItem> {
    return this.httpClient.post<TodoItem>(`${this.baseUrl}`, body);
  }

  public createTodoList(body: Omit<TodoList, 'items'>): Observable<TodoList> {
    const user_id = this.authHttpService.user$.value?.id
    return this.httpClient.post<TodoList>(`${this.baseUrl}/list`, {...body, user_id});
  }

  public updateTodo(body: TodoItem): Observable<TodoItem> {
    return this.httpClient.patch<TodoItem>(`${this.baseUrl}/${body.id}`, body);
  }

  public updateTodoList(body: TodoList): Observable<Omit<TodoList, 'items'>> {
    const {items, ...payload} = body
    return this.httpClient.patch<Omit<TodoList, 'items'>>(`${this.baseUrl}/list/${body.id}`, payload);
  }

  public deleteTodo(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  public deleteTodoList(id: number): Observable<boolean> {
    return this.httpClient.delete<any>(`${this.baseUrl}/list/${id}`);
  }

  public getLists(): Observable<TodoList[]> {
    return this.httpClient.get<TodoList[]>(`${this.baseUrl}/lists`);
  }

  public getGroups(): Observable<Record<string, TodoGroup>> {
    return this.httpClient.get<Record<string, TodoGroup>>(`${this.baseUrl}/groups`);
  }


}
