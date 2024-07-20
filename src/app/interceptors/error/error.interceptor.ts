import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, of} from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((e) => {
    console.error(`Error: ${e.message}`);
    return of(e);
  }))

};
