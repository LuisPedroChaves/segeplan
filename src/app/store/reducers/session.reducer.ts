import { createReducer, on } from '@ngrx/store';

import { ISession } from 'src/app/core/models/adicionales/session.model';
import * as actions from '../actions';
import { LOGOUT, SET_SESSION } from '../actions/session.actions';


export interface SessionState {
  token: string;
  session: ISession;
}


export const SESSION_STATE: SessionState = {
  token: null!,
  session: null!,
};


const _SESSION_REDUCER = createReducer(SESSION_STATE,
  on(SET_SESSION, (state, { session }) => ({ ...state, session, token: session.token })),
  // on(actions.loginError, (state, { payload }) => ({ ...state, loading: false, loaded: true, error: { statusCode: payload.status, statusText: payload.statusText, error: payload.error, errorMsg: payload.errorMessage } })),
  on(LOGOUT, (state) => ({ ...state, token: null!, session: null! })),
);


export function SessionReducer(state: any, action: any) {
  return _SESSION_REDUCER(state, action);
}
