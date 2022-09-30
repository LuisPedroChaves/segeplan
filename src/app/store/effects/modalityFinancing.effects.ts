import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { SinafipService } from "../../core/services/httpServices/sinafip.service";

@Injectable()
export class ModalityFinancingEffects {

  constructor(
    private sinafipService: SinafipService,
    private actions$: Actions,
  ) { }


  readModalityFinancings = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_MODALITYFINANCINGS),
        mergeMap(
            () => this.sinafipService.getModalityFinancing()
                .pipe(
                    map(modalityFinancings => {
                      return actions.SET_MODALITYFINANCINGS({ modalityFinancings })
                    })
                )
        )
      )
  )
}
