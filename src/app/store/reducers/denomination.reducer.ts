import { createReducer, on } from '@ngrx/store';
import { Denomination } from '../../core/models/alternative/Denomination';

import * as actions from '../actions';
import { AppState } from '../app.reducer';

export interface DenominationState {
    denominations: Denomination[],
}

export interface DenominationStore extends AppState {
    denomination: DenominationState
}

export const DENOMINATION_STATE: DenominationState = {
    denominations: [],
}

const _DENOMINATION_REDUCER = createReducer(DENOMINATION_STATE,
  on(actions.SET_DENOMINATIONS, (state, { denominations: denominations }) => ({
    ...state,
    denominations: [...denominations],
})),
)

export function DenominationReducer(state: DenominationState, action: any) {
    return _DENOMINATION_REDUCER(state, action)
}
