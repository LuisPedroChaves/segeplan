import { Action, createReducer, on } from '@ngrx/store';
import { IProject } from 'src/app/core/models/seguimiento/project';

import * as actions from '../actions';
import { AppState } from '../app.reducer';

export interface CheckProjectState {
  isMinistry: boolean,
  projects: IProject[],
  project: IProject
}

export interface CheckProjectStore extends AppState {
  checkProject: CheckProjectState
}

export const CHECK_PROJECT_STATE: CheckProjectState = {
  isMinistry: false,
  projects: [],
  project: null!
}

const _CHECK_REDUCER_REDUCER = createReducer(CHECK_PROJECT_STATE,

  on(actions.CHANGE_IS_MINISTRY, (state, { isMinistry }) => ({
    ...state,
    isMinistry,
  })),

  on(actions.SET_CHECK_PROJECTS, (state, { checkProjects }) => ({
    ...state,
    projects: [...checkProjects]
  })),

  on(actions.SET_NEW_CHECK_PROJECT, (state, { checkProject }) => ({
    ...state,
    projects: [...state.projects, checkProject]
  })),

)

export function CheckProjectReducer(state: CheckProjectState, action: Action) {
  return _CHECK_REDUCER_REDUCER(state, action)
}
