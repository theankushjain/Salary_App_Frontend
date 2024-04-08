import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn,Router, RouterStateSnapshot } from '@angular/router';
import { inject } from "@angular/core";
import { LoginService } from './login.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
  ) => {
    const loginService = inject(LoginService);
    const router = inject(Router)

  if(loginService.isLoggedIn())
  {
    return true;
  }
  router.navigate(['login']);
  return false;
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => authGuard(route, state);


