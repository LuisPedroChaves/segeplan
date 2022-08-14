import { createReducer, on } from '@ngrx/store';

import { IProduct } from 'src/app/core/models/adicionales/Product';
import * as actions from '../actions';
import { AppState } from '../app.reducer';

export interface ProductState {
    products: IProduct[],
}

export interface ProductStore extends AppState {
    product: ProductState
}

export const PRODUCT_STATE: ProductState = {
    products: [
      { codigo: '1', nombre: 'Producto 1'},
      { codigo: '1', nombre: 'Producto 2'},
      { codigo: '1', nombre: 'Producto 3'},
    ],
}

const _PRODUCT_REDUCER = createReducer(PRODUCT_STATE,
)

export function ProductReducer(state: ProductState, action: any) {
    return _PRODUCT_REDUCER(state, action)
}
