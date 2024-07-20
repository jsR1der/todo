import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthHttpService} from "../../pages/auth/auth-http.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authHttpService = inject(AuthHttpService)
  req = req.clone({
    withCredentials: true,
    responseType: 'json'
  })
  if (authHttpService.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authHttpService.token}`
      }
    });
  }
  return next(req);
};
