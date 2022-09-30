import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { SinafipService } from "../../core/services/httpServices/sinafip.service";

@Injectable()
export class EntityEffects {

  constructor(
    private sinafipService: SinafipService,
    private actions$: Actions,
  ) { }


  readEntities = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_ENTITIES),
        mergeMap(
            () => this.sinafipService.getEntities()
                .pipe(
                    map(entities => {
                      return actions.SET_ENTITIES({ entities })
                    })
                )
        )
      )
  )
}
