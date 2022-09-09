import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ISession } from '../models/adicionales/session.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.root;
  private url = `${this.API_URL}api/login`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(username: string, password: string): Observable<ISession> {

    const BODY = `username=${username}&password=${password}`;

    return this.http.post(this.url, BODY, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).pipe(
      map((resp: any) => resp)
    );
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('segeplan-session')!) ? JSON.parse(localStorage.getItem('segeplan-session')!).token : null;
  }

  // refreshToken() {
  //   const url = this.apiService.API_LOGIN + '/renuevatoken';

  //   return this.http.get(url)
  //     .pipe(
  //       map((resp: any) => {

  //         const session = localStorage.getItem('teDenuncio-session') ? JSON.parse(localStorage.getItem('teDenuncio-session')!) : null;

  //         // tslint:disable-next-line: no-string-literal
  //         const tokenr = resp['token'];

  //         session.token = tokenr;
  //         if (tokenr) {
  //           localStorage.setItem('teDenuncio-session', JSON.stringify(session));
  //           return true;
  //         }
  //       }), catchError((err, caught) => {
  //         this.router.navigate(['/session']);
  //         localStorage.removeItem('teDenuncio-session');
  //         return throwError(() => err);
  //       }));
  // }
}
