import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { GeneralInformationService } from '../../core/services/httpServices/generalInformation.service';

@Injectable()
export class ReferenceEffects {

  constructor(
    private generalInformationService: GeneralInformationService,
    private actions$: Actions,
  ) { }


  readReferences = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_REFERENCES),
        mergeMap(
            () => this.generalInformationService.getReferencePopulation()
                .pipe(
                    map(references => {
                      return actions.SET_REFERENCES({ references })
                    })
                )
        )
      )
  )
}
