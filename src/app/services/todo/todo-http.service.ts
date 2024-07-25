import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateTodo, Todo, TodoItem, TodoList} from "./todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodoHttpService {
  private readonly baseUrl = 'http://localhost:3000/todos'

  constructor(private readonly httpClient: HttpClient) {
  }

  public createTodo(body: CreateTodo): Observable<TodoItem> {
    return this.httpClient.post<TodoItem>(`${this.baseUrl}`, body);
  }

  public createTodoList(body: Omit<TodoList, 'items'>): Observable<Todo> {
    return this.httpClient.post<Todo>(`${this.baseUrl}/list`, body);
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

  public deleteTodoList(id: boolean): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/list/${id}`);
  }

  public getLists(): Observable<TodoList[]> {
    return this.httpClient.get<TodoList[]>(`${this.baseUrl}/lists`);
  }


}
