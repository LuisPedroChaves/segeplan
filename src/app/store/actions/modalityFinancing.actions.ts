import { createAction, props } from '@ngrx/store';
import { ModalityFinancing } from '../../core/models/sinafip/modalityFinancing';


export const READ_MODALITYFINANCINGS = createAction(
	'[MODALITYFINANCINGS] Leer modalityFinancings'
);

export const SET_MODALITYFINANCINGS = createAction(
	'[MODALITYFINANCINGS] Asignar modalityFinancings',
	props<{ modalityFinancings: ModalityFinancing[] }>()
)
