import { createAction, props } from '@ngrx/store';

import { GeneralInformation } from 'src/app/core/models/GeneralInformation';

export const READ_IDEAS = createAction(
	'[IDEAS] Leer ideas'
)

export const SET_IDEAS = createAction(
	'[IDEAS] Asignar ideas',
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

export const UPDATE_IDEA = createAction(
	'[IDEA] Editar idea',
	props<{ idea: GeneralInformation }>()
)

export const SET_EDIT_IDEA = createAction(
	'[IDEA] Asignar idea editada',
	props<{ idea: GeneralInformation }>()
)

// export const SET_BANK_ACCOUNT_BALANCE = createAction(
// 	'[BANK_ACCOUNT] Asignar balance a cuenta bancaria',
// 	props<{ idBankAccount: string, amount: number }>()
// )
