import {ElementRef, Injectable} from '@angular/core';
import {fromEvent} from "rxjs";
import {InputConfig, OutputEventKey} from "./input.model";

@Injectable()
export class InputService {

  constructor() {
  }

  public setEvents<T>(config: InputConfig<T>): void {
    config.inputEvents.forEach((eventName: OutputEventKey) => {
      if (config.inputRef) {
        config.outputEvents[eventName] = fromEvent(config.inputRef, eventName)
      }
    })
  }

  public setInputRef<T>(inputRef: ElementRef<HTMLInputElement>, config: InputConfig<T>): void {
    config.inputRef = inputRef.nativeElement;
  }

}
