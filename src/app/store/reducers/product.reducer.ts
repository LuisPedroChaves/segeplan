import { createReducer, on } from '@ngrx/store';

import { IProduct } from 'src/app/core/models/informationGeneral/Product';
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
      { code: '1', name: 'Producto 1'},
      { code: '1', name: 'Producto 2'},
      { code: '1', name: 'Producto 3'},
    ],
}

const _PRODUCT_REDUCER = createReducer(PRODUCT_STATE,
)

export function ProductReducer(state: ProductState, action: any) {
    return _PRODUCT_REDUCER(state, action)
}
