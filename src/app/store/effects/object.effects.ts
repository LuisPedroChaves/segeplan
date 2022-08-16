import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { IntegrationsService } from '../../core/services/httpServices/integrations.service';

@Injectable()
export class ObjectEffects {

  constructor(
    private integrationsService: IntegrationsService,
    private actions$: Actions,
  ) { }


  readObjects = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_OBJECTS),
        mergeMap(
            () => this.integrationsService.getObjetos()
                .pipe(
                    map(objects => actions.SET_OBJECTS({ objects }))
                )
        )
      )
  )
}
