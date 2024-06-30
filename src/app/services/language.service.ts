import {Inject, Injectable} from '@angular/core';
import {WINDOW} from "../constants/global";

@Injectable()
export class LanguageService {

  constructor(@Inject(WINDOW) private window: Window) {
  }

  public getUserLanguage(): string {
    const language = this.window.navigator.language;
    const hyphenPosition: number = language.indexOf('-');
    if (hyphenPosition) {
      return language.slice(0,hyphenPosition)
    }
    return language;
  }
}
