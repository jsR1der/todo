import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {inject} from "@angular/core";
import {LoadingService} from "./loading.service";
import {catchError, map, of} from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService)
  loadingService.setLoading(true, req.url);
  return next(req).pipe(catchError((e) => {
    loadingService.setLoading(false, req.url);
    return of(e);
  }))
    .pipe(map(evt => {
      if (evt instanceof HttpResponse) {
        loadingService.setLoading(false, req.url)
      }
      return evt
    }))
};
