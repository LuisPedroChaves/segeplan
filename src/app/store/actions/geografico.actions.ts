import { createAction, props } from '@ngrx/store';

import { Departament } from '../../core/models/adicionales/department';

export const READ_GEOGRAFICOS = createAction(
	'[GEOGRAFICOS] Leer geograficos'
);

export const SET_GEOGRAFICOS = createAction(
	'[GEOGRAFICOS] Asignar geograficos',
	props<{ geograficos: Departament[] }>()
)
