import { createReducer, on } from '@ngrx/store';
import { GeneralStudy } from '../../core/models/sinafip/generalStudy';

import * as actions from '../actions';
import { AppState } from '../app.reducer';

export interface GeneralStudyState {
    generalStudies: GeneralStudy[],
}

export interface GeneralStudyStore extends AppState {
    generalStudy: GeneralStudyState
}

export const GENERALSTUDY_STATE: GeneralStudyState = {
    generalStudies: [],
}

const _GENERALSTUDY_REDUCER = createReducer(GENERALSTUDY_STATE,
  on(actions.SET_GENERALSTUDIES, (state, { generalStudies: generalStudies }) => ({
    ...state,
    generalStudies: [...generalStudies],
})),
)

export function GeneralStudyReducer(state: GeneralStudyState, action: any) {
    return _GENERALSTUDY_REDUCER(state, action)
}
