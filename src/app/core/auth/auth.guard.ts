import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {

    if (localStorage.getItem('segeplan-session')) {
      return true;
    }

    localStorage.removeItem('segeplan-session');
    this.router.navigate(['/session']);
    return false;
  }

}
