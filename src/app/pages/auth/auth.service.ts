import {Injectable} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly form = new FormGroup({
    name: this.fb.control('', [Validators.required]),
    pass: this.fb.control('', [Validators.required, Validators.minLength(5)])
  }, {updateOn: 'blur'})

  get controls() {
    return this.form.controls;
  }

  constructor(private fb: NonNullableFormBuilder) {
  }
}
