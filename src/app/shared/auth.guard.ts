import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if(route.queryParams['authenticated'] === 'true'){
    return true;
  }
  return router.createUrlTree(['login']);
};
