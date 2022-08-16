import { createAction, props } from '@ngrx/store';
import { Denomination } from '../../core/models/alternative/Denomination';


export const READ_DENOMINATIONS = createAction(
	'[DENOMINATIONS] Leer denominations'
);

export const SET_DENOMINATIONS = createAction(
	'[DENOMINATIONS] Asignar denominations',
	props<{ denominations: Denomination[] }>()
)
