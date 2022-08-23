import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';
import { AppState } from '../app.reducer';
import { ReferencePopulation } from '../../core/models/alternative/ReferencePopulation';

export interface ReferenceState {
    references: ReferencePopulation[],
}

export interface ReferenceStore extends AppState {
    reference: ReferenceState
}

export const REFERENCE_STATE: ReferenceState = {
    references: [],
}

const _REFERENCE_REDUCER = createReducer(REFERENCE_STATE,
  on(actions.SET_REFERENCES, (state, { references: references }) => ({
    ...state,
    references: [...references],
})),
)

export function ReferenceReducer(state: ReferenceState, action: any) {
    return _REFERENCE_REDUCER(state, action)
}
