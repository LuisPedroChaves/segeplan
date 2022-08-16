import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { IntegrationsService } from '../../core/services/httpServices/integrations.service';

@Injectable()
export class GeograficoEffects {

  constructor(
    private integrationsService: IntegrationsService,
    private actions$: Actions,
  ) { }


  readGeograficos = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_GEOGRAFICOS),
        mergeMap(
            () => this.integrationsService.getGeograficos()
                .pipe(
                    map(geograficos => actions.SET_GEOGRAFICOS({ geograficos }))
                )
        )
      )
  )
}
