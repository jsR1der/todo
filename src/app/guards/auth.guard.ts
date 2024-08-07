import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthHttpService} from "../pages/auth/auth-http.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authHttpService = inject(AuthHttpService)
  if (authHttpService.user$.value?.id) {
    return true;
  }
  return router.createUrlTree(['auth']);
};
