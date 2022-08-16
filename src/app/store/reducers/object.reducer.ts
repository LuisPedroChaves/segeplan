import { createReducer, on } from '@ngrx/store';
import { IObject } from '../../core/models/adicionales/objeto';

import * as actions from '../actions';
import { AppState } from '../app.reducer';

export interface ObjectState {
    objects: IObject[],
}

export interface ObjectStore extends AppState {
    object: ObjectState
}

export const OBJECT_STATE: ObjectState = {
    objects: [],
}

const _OBJECT_REDUCER = createReducer(OBJECT_STATE,
  on(actions.SET_OBJECTS, (state, { objects: objects }) => ({
    ...state,
    objects: [...objects],
})),
)

export function ObjectReducer(state: ObjectState, action: any) {
    return _OBJECT_REDUCER(state, action)
}
