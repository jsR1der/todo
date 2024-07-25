import {Injectable} from '@angular/core';
import {FormControl, NonNullableFormBuilder} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class TodoService {
  public todoDescriptionControl: FormControl<string>;
  public isLoading = new BehaviorSubject<boolean>(false)

  constructor(private fb: NonNullableFormBuilder) {
  }

  public setTodoDescriptionControl(initialValue: string = ''): void {
    this.todoDescriptionControl = this.fb.control(initialValue);
  }
}
