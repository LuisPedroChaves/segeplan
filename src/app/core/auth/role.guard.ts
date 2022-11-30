import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    const SESSION = localStorage.getItem('segeplan-session')
    const ALLOWED_ROLES = route.data?.['allowedRoles']

    if (SESSION) {

      const ROLE = JSON.parse(SESSION).usuario.role;

      return ALLOWED_ROLES.includes(ROLE)

    }

    return false;
  }

}
