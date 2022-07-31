import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';
import { AppState } from '../app.reducer';

export interface DrawerState {
  menuDrawer: boolean,
  fullDrawer: boolean,
  fullTitle: string,
  fullComponent: string,
}

export interface DrawerStore extends AppState {
  drawer: DrawerState
}

export const DRAWER_STATE: DrawerState = {
  menuDrawer: true,
  fullDrawer: false,
  fullTitle: '',
  fullComponent: '',
}

const _DRAWER_REDUCER = createReducer(DRAWER_STATE,
  on(actions.CHANGE_MENU_DRAWER, (state) => ({...state, menuDrawer: !state.menuDrawer})),
  on(actions.OPEN_FULL_DRAWER, (state, { fullTitle, fullComponent }) => ({ ...state, fullDrawer: true, fullTitle, fullComponent })),
  on(actions.CLOSE_FULL_DRAWER, (state) => ({ ...state, fullDrawer: false })),
)

export function DrawerReducer(state: any, action: any) {
  return _DRAWER_REDUCER(state, action)
}
