import { createAction, props } from '@ngrx/store';
import { IRequest } from 'src/app/core/models/sinafip/request';

export const SET_INITIATIVE = createAction(
	'[IDEA] Asignar iniciativa',
	props<{ initiative: IRequest }>()
)
