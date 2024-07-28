import {Injectable} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder} from "@angular/forms";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
import {TodoFormModel} from "./todo.model";
import {TodoItem} from "../../services/todo/todo.model";
import {TodoHttpService} from "../../services/todo/todo-http.service";

@Injectable()
export class TodoService {
  public form: FormGroup<TodoFormModel> = new FormGroup<TodoFormModel>({
    name: this.fb.control<string>('',{updateOn: 'blur'}),
    description: this.fb.control<string | null>(null,{updateOn: 'blur'}),
    tags: this.fb.control<string[]>([],{updateOn: 'blur'}),
    date: this.fb.control<string | null>(null),
    iscompleted: this.fb.control<boolean>(false),
  })

  get controls() {
    return this.form.controls;
  }

  public isLoading = new BehaviorSubject<boolean>(false)

  constructor(private fb: NonNullableFormBuilder, private readonly todoHttpService: TodoHttpService) {
  }


  public handleInputEvents<T>(event: Event, control: FormControl<T>, callback: (value: string) => void): void {
    const value = control.value as string;
    if (value) {

      if (event instanceof KeyboardEvent && event.key === ' ') {
        callback(value);
      }

      if (event instanceof FocusEvent) {
        callback(value);
      }
    }
  }

  public handleTagEvents<T>(event: Event, control: FormControl<T>, callback: (value: string) => void): void {
    const value = control.value as string;
    if (event instanceof KeyboardEvent && (event.key === 'Delete' || event.key === 'Backspace')) {
      console.log(control.value);
      callback(value);
      return;
    }

    if (event instanceof FocusEvent) {
      callback(value)
      return;
    }
  }

  public updateTodo(todo: TodoItem): Observable<TodoItem> {
    this.isLoading.next(true);
    return this.todoHttpService.updateTodo({
      ...todo,
      ...this.form.value as Partial<TodoItem>
    }).pipe(
      catchError(e => {
        // show snackbar
        return of(e)
      }),
      finalize(() => this.isLoading.next(false)))
  }
}
