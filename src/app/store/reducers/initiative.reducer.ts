import { Action, createReducer, on } from '@ngrx/store';

import { IRequest } from 'src/app/core/models/sinafip/request';
import { AppState } from '../app.reducer';
import { SET_INITIATIVE } from '../actions/initiative.actions';

export interface InitiativeState {
  initiative: IRequest
}

export interface InitiativeStore extends AppState {
  initiative: InitiativeState
}

export const INITIATIVE_STATE: InitiativeState = {
  initiative: null!
}

const _INITIATIVE_REDUCER = createReducer(INITIATIVE_STATE,

  on(SET_INITIATIVE, (state, { initiative }) => ({
    ...state,
    initiative: { ...initiative }
  })),

)

export function InitiativeReducer(state: InitiativeState, action: Action) {
  return _INITIATIVE_REDUCER(state, action)
}
