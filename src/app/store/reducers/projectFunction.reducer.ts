import { createReducer, on } from '@ngrx/store';
import { ProjectFunction } from '../../core/models/sinafip/projectFunction';

import * as actions from '../actions';
import { AppState } from '../app.reducer';

export interface ProjectFunctionState {
    projectFunctions: ProjectFunction[],
}

export interface ProjectFunctionStore extends AppState {
    projectFunction: ProjectFunctionState
}

export const PROJECTFUNCTION_STATE: ProjectFunctionState = {
    projectFunctions: [],
}

const _PROJECTFUNCTION_REDUCER = createReducer(PROJECTFUNCTION_STATE,
  on(actions.SET_PROJECTFUNCTIONS, (state, { projectFunctions: projectFunctions }) => ({
    ...state,
    projectFunctions: [...projectFunctions],
})),
)

export function ProjectFunctionReducer(state: ProjectFunctionState, action: any) {
    return _PROJECTFUNCTION_REDUCER(state, action)
}
