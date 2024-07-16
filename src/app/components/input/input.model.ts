import {FormControl} from "@angular/forms";

export interface InputConfig<T> {
  placeholder?: string;
  control: FormControl<T>
  events:  string[];
}

