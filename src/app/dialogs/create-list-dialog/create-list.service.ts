import {Injectable} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {CreateTodoListForm} from "./create-dialog.model";

@Injectable({
  providedIn: 'root'
})
export class CreateListService {
  public form: FormGroup<CreateTodoListForm> = this.fb.group({
    name: this.fb.control('', {
      validators: Validators.required,
      updateOn: 'blur'
    })
  })

  get controls() {
    return this.form.controls;
  }

  constructor(private fb: NonNullableFormBuilder) {
  }
}
