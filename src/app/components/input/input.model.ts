import {AbstractControl, FormControl} from "@angular/forms";
import {Observable} from "rxjs";

export interface InputConfig<T> {
  control: FormControl<T>;
  inputEvents: OutputEventKey[];
  placeholder?: string;
  inputRef: HTMLInputElement | null;
  outputEvents: Record<OutputEventKey, Observable<Event>>;
}

export type OutputEventKey = 'keydown' | 'input' | 'focusout'

export class InputConfigBuilder<T> implements InputConfig<T> {
  public inputRef = null;
  public outputEvents = {} as Record<OutputEventKey, Observable<Event>>;

  constructor(
    public inputEvents: OutputEventKey[],
    public control: FormControl<T>,
    public placeholder?: string) {
  }
}
