import {ElementRef, Injectable} from '@angular/core';
import {fromEvent, Observable} from "rxjs";

@Injectable()
export class InputService {
  public input: HTMLInputElement | null = null;
  public events$: Record<string, Observable<Event>> = {}

  constructor() {
  }

  public setEvents(events: string[]): void {
    events.forEach(eventName => {
      if (this.input) {
        this.events$[eventName] = fromEvent(this.input, eventName)
      }
    })
  }

  public setInput(inputRef: ElementRef<HTMLInputElement>): void {
    this.input = inputRef.nativeElement;
  }
}
