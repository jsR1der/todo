import {Injectable} from '@angular/core';
import {NonNullableFormBuilder} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  public tagControl = this.fb.control<string>('')

  constructor(private fb: NonNullableFormBuilder) {
  }

  public handleInputEvents(event: Event, callback: (value: string) => void): void {
    if (this.tagControl.value) {

      if (event instanceof KeyboardEvent && event.key === ' ') {
        callback(this.tagControl.value)
        this.tagControl.reset();
      }

      if (event instanceof FocusEvent) {
        callback(this.tagControl.value);
        this.tagControl.reset();
      }
    }

  }


}
