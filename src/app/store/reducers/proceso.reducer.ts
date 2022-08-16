import { createReducer, on } from '@ngrx/store';
import { Procesos } from '../../core/models/adicionales/process';

import * as actions from '../actions';
import { AppState } from '../app.reducer';

export interface ProcesoState {
    procesos: Procesos[],
}

export interface ProcesoStore extends AppState {
    proceso: ProcesoState
}

export const PROCESO_STATE: ProcesoState = {
    procesos: [],
}

const _PROCESO_REDUCER = createReducer(PROCESO_STATE,
  on(actions.SET_PROCESOS, (state, { procesos: procesos }) => ({
    ...state,
    procesos: [...procesos],
})),
)

export function ProcesoReducer(state: ProcesoState, action: any) {
    return _PROCESO_REDUCER(state, action)
}
