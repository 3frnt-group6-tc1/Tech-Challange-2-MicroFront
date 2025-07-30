import { inject } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { NavigationUtil } from '../utils/navigation.util';

import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from '@angular/router';

export const loginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);

  // Check for logout query param and logout if present
  if (route.queryParamMap.get('logout') === 'true') {
    authService.logout();
  }

  if (!authService.isAuthenticated()) {
    return true;
  }

  // Redirect to panel if already authenticated
  NavigationUtil.emitNavigationEvent('/panel');
  return false;
};
