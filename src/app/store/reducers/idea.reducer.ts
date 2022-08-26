import { Action, createReducer, on } from '@ngrx/store';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import * as actions from '../actions';
import { AppState } from '../app.reducer';

export interface IdeaState {
  ideas: GeneralInformation[],
  sendIdeas: GeneralInformation[],
  doneIdeas: GeneralInformation[],
  idea: GeneralInformation
}

export interface IdeaStore extends AppState {
  idea: IdeaState
}

export const IDEA_STATE: IdeaState = {
  ideas: [],
  sendIdeas: [],
  doneIdeas: [],
  idea: null!
}

const _IDEA_REDUCER = createReducer(IDEA_STATE,
  on(actions.SET_IDEAS, (state, { ideas }) => ({
    ...state,
    ideas: [...ideas],
  })),
  on(actions.SET_SEND_IDEAS, (state, { ideas }) => ({
    ...state,
    sendIdeas: [...ideas],
  })),
  on(actions.SET_DONE_IDEAS, (state, { ideas }) => ({
    ...state,
    doneIdeas: [...ideas],
  })),
  on(actions.SET_NEW_IDEA, (state, { idea }) => ({
    ...state,
    ideas: [...state.ideas, idea]
  })),
  on(actions.SET_IDEA, (state, { idea }) => ({
    ...state,
    idea: { ...idea }
  })),
  on(actions.SET_SEND_IDEA, (state, { idea }) => ({
    ...state,
    ideas: state.ideas.filter(i => {
      return i.codigo !== idea.codigo
    }),
    sendIdeas: [...state.sendIdeas, idea]
  })),
  on(actions.SET_DONE_IDEA, (state, { idea }) => ({
    ...state,
    sendIdeas: state.sendIdeas.filter(i => {
      return i.codigo !== idea.codigo
    }),
    doneIdeas: [...state.doneIdeas, idea]
  })),
)

export function IdeaReducer(state: IdeaState, action: Action) {
  return _IDEA_REDUCER(state, action)
}
