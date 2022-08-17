import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { GeneralInformationService } from '../../core/services/httpServices/generalInformation.service';

@Injectable()
export class DenominationEffects {

  constructor(
    private generalInformationService: GeneralInformationService,
    private actions$: Actions,
  ) { }


  readDenominations = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_DENOMINATIONS),
        mergeMap(
            () => this.generalInformationService.getDenomination()
                .pipe(
                    map(denominations => {
                      return actions.SET_DENOMINATIONS({ denominations })
                    })
                )
        )
      )
  )
}
