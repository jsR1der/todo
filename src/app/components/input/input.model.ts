import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

export interface InputConfig<T> {
  control: FormControl<T>;
  inputEvents: OutputEventKey[];
  styles: { container?: Record<string, string>, input?: Record<string, string> }
  placeholder?: string;
  type: string;
  inputRef: HTMLInputElement | null;
  outputEvents: Record<OutputEventKey, Observable<Event>>;
}

export type OutputEventKey = 'keydown' | 'input' | 'focusout'

export class InputConfigBuilder<T> implements InputConfig<T> {
  public type = "text";
  public inputRef = null;
  public styles: { container?: Record<string, string>, input?: Record<string, string> } = {};
  public control: FormControl<T>;
  public inputEvents: OutputEventKey[] = []
  public outputEvents = {} as Record<OutputEventKey, Observable<Event>>;
  public placeholder: string

  public addStyles(styles: { container?: Record<string, string>, input?: Record<string, string> }): this {
    this.styles = styles;
    console.log(this.styles)
    return this;
  }

  public setControl(control: FormControl<T>): this {
    this.control = control;
    return this;
  }


  public addEvents(events: OutputEventKey[]): this {
    this.inputEvents = events;
    return this;
  }

  public addPlaceholder(placeholder: string): this {
    this.placeholder = placeholder;
    return this;
  }

  public setType(type: string): this {
     this.type = type;
     return this;
  }


}
