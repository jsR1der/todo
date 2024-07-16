import {Injectable} from '@angular/core';
import {FormControl, NonNullableFormBuilder} from "@angular/forms";

@Injectable()
export class TodoService {
  public todoDescriptionControl: FormControl<string>;

  constructor(private fb: NonNullableFormBuilder) {
  }

  public setTodoDescriptionControl(initialValue: string = ''): void {
    this.todoDescriptionControl = this.fb.control(initialValue);
  }
}
