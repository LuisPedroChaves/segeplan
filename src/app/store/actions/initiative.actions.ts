import { createAction, props } from '@ngrx/store';
import { Activity } from 'src/app/core/models/sinafip/activity';
import { IRequest } from 'src/app/core/models/sinafip/request';

export const SET_INITIATIVE = createAction(
	'[INICIATIVA] Asignar iniciativa',
	props<{ initiative: IRequest }>()
)

export const SET_ACTIVITY = createAction(
  '[ACTIVIDAD], Asignar actividad',
  props<{ activity: Activity }>()
)

export const REMOVE_ACTIVITY = createAction(
  '[ACTIVIDAD] Remover actividad del listado',
  props<{ activity: Activity }>()
)

export const DELETE_ACTIVITIES = createAction(
  '[ACTIVIDAD] Eliminar listado de actividades'
)
