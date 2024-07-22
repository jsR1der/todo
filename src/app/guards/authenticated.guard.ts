import {CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthHttpService} from "../pages/auth/auth-http.service";

export const authenticatedGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authHttpService = inject(AuthHttpService);
  if (authHttpService.user$.value?.id) {
    return router.createUrlTree(['/']);
  }
  return true
};
