import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {

  constructor() { }

  public getUserTimeZone(): Intl.ResolvedDateTimeFormatOptions {
    return Intl.DateTimeFormat().resolvedOptions();
  }
}
