import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { SinafipService } from "../../core/services/httpServices/sinafip.service";

@Injectable()
export class GeneralStudyEffects {

  constructor(
    private sinafipService: SinafipService,
    private actions$: Actions,
  ) { }


  readGeneralStudies = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_GENERALSTUDIES),
        mergeMap(
            () => this.sinafipService.getGeneralStudies()
                .pipe(
                    map(generalStudies => {
                      return actions.SET_GENERALSTUDIES({ generalStudies })
                    })
                )
        )
      )
  )
}
