import { createAction, props } from '@ngrx/store';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { FiltroIdeas } from 'src/app/core/models/adicionales/filtroIdeas';

export const READ_IDEAS = createAction(
	'[IDEAS] Leer ideas'
)

export const READ_SEND_IDEAS = createAction(
	'[IDEAS] Leer ideas enviadas',
	props<{ filtro: FiltroIdeas }>()
)

export const READ_DONE_IDEAS = createAction(
	'[IDEAS] Leer ideas calificadas',
  props<{ filtro: FiltroIdeas }>()
)

export const SET_IDEAS = createAction(
	'[IDEAS] Asignar ideas creadas',
	props<{ ideas: GeneralInformation[] }>()
)

export const SET_SEND_IDEAS = createAction(
	'[IDEAS] Asignar ideas enviadas',
	props<{ ideas: GeneralInformation[] }>()
)

export const SET_DONE_IDEAS = createAction(
	'[IDEAS] Asignar ideas calificadas',
	props<{ ideas: GeneralInformation[] }>()
)

export const CREATE_IDEA = createAction(
	'[IDEA] Crear nueva idea',
	props<{ idea: GeneralInformation }>()
)

export const SET_NEW_IDEA = createAction(
	'[IDEA] Asignar nueva idea',
	props<{ idea: GeneralInformation }>()
)

export const SET_IDEA = createAction(
	'[IDEA] Asignar idea',
	props<{ idea: GeneralInformation }>()
)

export const UPDATE_CREATED_IDEA = createAction(
	'[IDEA] Cambiar estado a enviada',
	props<{ idea: GeneralInformation }>()
)

export const SET_SEND_IDEA = createAction(
	'[IDEA] Asignar idea editada',
	props<{ idea: GeneralInformation }>()
)

export const UPDATE_SEND_IDEA = createAction(
	'[IDEA] Cambiar estado a calificada',
	props<{ idea: GeneralInformation }>()
)

export const SET_DONE_IDEA = createAction(
	'[IDEA] Asignar idea editada',
	props<{ idea: GeneralInformation }>()
)
