import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

import { AdminAuthPageComponent } from '../pages/admin-auth-page/admin-auth-page.component';

export const adminAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const router = new Router();
  if (AdminAuthPageComponent.isAuthenticatedUser()) {
    return true;
  }
  if (state.url.startsWith('/admin')) {
    return router.parseUrl('/');
  }
  return false;
};
