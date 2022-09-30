import { createReducer, on } from '@ngrx/store';
import { Entity } from '../../core/models/sinafip/entity';

import * as actions from '../actions';
import { AppState } from '../app.reducer';

export interface EntityState {
    entities: Entity[],
}

export interface EntityStore extends AppState {
    entity: EntityState
}

export const ENTITY_STATE: EntityState = {
    entities: [],
}

const _ENTITY_REDUCER = createReducer(ENTITY_STATE,
  on(actions.SET_ENTITIES, (state, { entities: entities }) => ({
    ...state,
    entities: [...entities],
})),
)

export function EntityReducer(state: EntityState, action: any) {
    return _ENTITY_REDUCER(state, action)
}
