import {Injectable} from '@angular/core';
import {NonNullableFormBuilder, Validators} from "@angular/forms";

@Injectable()
export class ExpansionListService {
  public readonly control = this.fb.control('', Validators.required);


  constructor(private fb: NonNullableFormBuilder) {
  }

}
