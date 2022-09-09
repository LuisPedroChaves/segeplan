import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, delay, take } from 'rxjs/operators';

import { AuthService } from 'src/app/core/auth/auth.service';
import { LOGIN, SET_SESSION } from '../actions/session.actions';

@Injectable()
export class SessionEffects {
    constructor(private actions$: Actions, private authService: AuthService) {}



    loginEffect$ = createEffect( () => this.actions$.pipe(
        ofType(LOGIN),
        mergeMap( ({ username, password }) => this.authService.login(username, password).pipe(
            map(data => {
                localStorage.setItem('segeplan-session', JSON.stringify(data));
                return SET_SESSION({ session: data });
            }),
            // catchError(err => {
            //     const MESSAGE = 'Usuario o Contraseña invalido';

            //     return of(actions.loginError({ payload: {...err, errorMessage: MESSAGE} }));
            // })
        ))
    ));
}
