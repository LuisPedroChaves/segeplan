import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { Integrations } from '../../core/services/httpServices/integrations.service';

@Injectable()
export class ProductEffects {

  constructor(
    private integrationsService: Integrations,
    private actions$: Actions,
  ) { }


  readProducts = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_PRODUCTS),
        mergeMap(
            () => this.integrationsService.getProductos()
                .pipe(
                    map(products => actions.SET_PRODUCTS({ products }))
                )
        )
      )
  )
}
