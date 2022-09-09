import { createAction, props } from '@ngrx/store';

import { ISession } from 'src/app/core/models/adicionales/session.model';

export const LOGIN = createAction(
  '[SESSION] Login',
  props<{ username: string, password: string }>()
);
export const SET_SESSION = createAction(
  '[SESSION] Login Success',
  props<{ session: ISession }>()
);
export const LOGOUT = createAction(
  '[Singin Component] Logout',
);
