import { createAction, props } from '@ngrx/store';
import { DataGeo } from 'src/app/core/models/alternative/DataGeo';

import { IdeaAlternative } from 'src/app/core/models/alternative/ideaAlternative';

export const SET_ALTERNATIVE = createAction(
	'[IDEA] Asignar alternativa',
	props<{ alternative: IdeaAlternative }>()
)

export const SET_DATA_GEO = createAction(
  '[POSIBLE INMUEBLE], Asignar posible inmueble',
  props<{ dataGeo: DataGeo }>()
)

export const REMOVE_DATA_GEO = createAction(
  '[POSIBLE INMUEBLE] Remover posible inmueble del listado',
  props<{ dataGeo: DataGeo }>()
)

export const DELETE_DATA_GEOS = createAction(
  '[POSIBLE INMUEBLE] Eliminar listado de posibles inmuebles'
)
