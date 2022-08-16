import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { IntegrationsService } from '../../core/services/httpServices/integrations.service';

@Injectable()
export class ProcesoEffects {

  constructor(
    private integrationsService: IntegrationsService,
    private actions$: Actions,
  ) { }


  readProcesos = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_PROCESOS),
        mergeMap(
            () => this.integrationsService.getProcesos()
                .pipe(
                    map(procesos => actions.SET_PROCESOS({ procesos }))
                )
        )
      )
  )
}
