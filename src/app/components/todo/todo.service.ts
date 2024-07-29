import {Injectable} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {TodoFormModel} from "./todo.model";
import {TodoHttpService} from "../../services/todo/todo-http.service";

@Injectable()
export class TodoService {
  public form: FormGroup<TodoFormModel> = new FormGroup<TodoFormModel>({
    name: this.fb.control<string>('', {updateOn: 'blur', validators: [Validators.required]}),
    description: this.fb.control<string | null>(null, {updateOn: 'blur'}),
    tags: this.fb.control<string[]>([], {updateOn: 'blur'}),
    date: this.fb.control<string | null>(null, {validators: [Validators.required]}),
    iscompleted: this.fb.control<boolean>(false),
  })

  get controls() {
    return this.form.controls;
  }

  public isLoading = new BehaviorSubject<boolean>(false)

  constructor(private fb: NonNullableFormBuilder, private readonly todoHttpService: TodoHttpService) {
  }
}
