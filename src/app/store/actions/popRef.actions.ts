import { createAction, props } from '@ngrx/store';
import { ReferencePopulation } from '../../core/models/alternative/ReferencePopulation';


export const READ_REFERENCES = createAction(
	'[REFERENCES] Leer references'
);

export const SET_REFERENCES = createAction(
	'[REFERENCES] Asignar references',
	props<{ references: ReferencePopulation[] }>()
)
