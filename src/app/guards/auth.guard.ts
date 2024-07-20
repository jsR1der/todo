import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  // if (route.queryParams['authenticated'] === 'true') {
  //   return true;
  // }
  // return router.createUrlTree(['auth']);
  return true;
};
