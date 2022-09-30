import { createAction, props } from '@ngrx/store';
import { Entity } from '../../core/models/sinafip/entity';


export const READ_ENTITIES = createAction(
	'[ENTITIES] Leer entities'
);

export const SET_ENTITIES = createAction(
	'[ENTITIES] Asignar entities',
	props<{ entities: Entity[] }>()
)
