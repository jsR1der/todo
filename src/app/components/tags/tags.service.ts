import {Injectable} from '@angular/core';
import {NonNullableFormBuilder} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  public tagControl = this.fb.control<string>('')

  constructor(private fb: NonNullableFormBuilder) {
  }

  public keyboardEventHandler(event: Event, callback: (value: string) => void): void {

    if ((event as KeyboardEvent).key === ' ') {
      callback(this.tagControl.value)
      this.tagControl.reset()
    }
  }


}
