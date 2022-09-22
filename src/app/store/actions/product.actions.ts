import { createAction, props } from '@ngrx/store';

import { IProduct } from 'src/app/core/models/adicionales/Product';

export const READ_PRODUCTS = createAction(
	'[PRODUCTOS] Leer productos',
	props<{ filtro: string }>()
);

export const SET_PRODUCTS = createAction(
	'[PRODUCTOS] Asignar productos',
	props<{ products: IProduct[] }>()
)
