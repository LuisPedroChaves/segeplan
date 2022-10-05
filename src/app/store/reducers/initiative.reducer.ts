import { Action, createReducer, on } from '@ngrx/store';

import { IRequest } from 'src/app/core/models/sinafip/request';
import { Activity } from 'src/app/core/models/sinafip/activity';
import { AppState } from '../app.reducer';
import { SET_INITIATIVE, SET_ACTIVITY, REMOVE_ACTIVITY, DELETE_ACTIVITIES } from '../actions/initiative.actions';

export interface InitiativeState {
  initiative: IRequest,
  activities: Activity[]
}

export interface InitiativeStore extends AppState {
  initiative: InitiativeState
}

export const INITIATIVE_STATE: InitiativeState = {
  initiative: null!,
  activities: []
}

const _INITIATIVE_REDUCER = createReducer(INITIATIVE_STATE,

  on(SET_INITIATIVE, (state, { initiative }) => ({
    ...state,
    initiative: { ...initiative }
  })),

  on(SET_ACTIVITY, (state, { activity }) => ({
    ...state,
    activities: [...state.activities, activity]
  })),

  on(REMOVE_ACTIVITY, (state, { activity }) => ({
    ...state,
    activities: state.activities.filter(item => item.id !== activity.id)
  })),

  on(DELETE_ACTIVITIES, (state) => ({
    ...state,
    activities: []
  })),

)

export function InitiativeReducer(state: InitiativeState, action: Action) {
  return _INITIATIVE_REDUCER(state, action)
}
