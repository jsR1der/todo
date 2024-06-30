import {FormControl} from "@angular/forms";

export interface InputConfig<T> {
  control: FormControl<T>
  events:  string[];
}

