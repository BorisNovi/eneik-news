import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

import { AdminAuthPageComponent } from '../admin/admin-auth-page/admin-auth-page.component';

export const adminAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const router = new Router();
  if (AdminAuthPageComponent.isAuthenticatedUser()) {
    return true;
  } else {
    if (state.url.startsWith('/admin')) {
      return router.parseUrl('/');
    } else {
      return false;
    }
  }
};
