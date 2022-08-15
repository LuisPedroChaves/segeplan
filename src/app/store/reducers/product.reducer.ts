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
    products: [],
}

const _PRODUCT_REDUCER = createReducer(PRODUCT_STATE,
  on(actions.SET_PRODUCTS, (state, { products: products }) => ({
    ...state,
    products: [...products],
})),
)

export function ProductReducer(state: ProductState, action: any) {
    return _PRODUCT_REDUCER(state, action)
}
