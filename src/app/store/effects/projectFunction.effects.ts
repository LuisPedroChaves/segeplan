import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { SinafipService } from "../../core/services/httpServices/sinafip.service";

@Injectable()
export class ProjectFunctionEffects {

  constructor(
    private sinafipService: SinafipService,
    private actions$: Actions,
  ) { }


  readProjectFunctions = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_PROJECTFUNCTIONS),
        mergeMap(
            () => this.sinafipService.getProjectFunction()
                .pipe(
                    map(projectFunctions => {
                      return actions.SET_PROJECTFUNCTIONS({ projectFunctions })
                    })
                )
        )
      )
  )
}
