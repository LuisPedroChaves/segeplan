import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { IntegrationsService } from '../../core/services/httpServices/integrations.service';

@Injectable()
export class ProductEffects {

  constructor(
    private integrationsService: IntegrationsService,
    private actions$: Actions,
  ) { }


  readProducts = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_PRODUCTS),
        mergeMap(
          (insto) => this.integrationsService.getProductos(insto.filtro)
            .pipe(
              map((products:any) => {
                console.log(products)
                return actions.SET_PRODUCTS({ products }
                )})
            )
        )
      )
  )
}
