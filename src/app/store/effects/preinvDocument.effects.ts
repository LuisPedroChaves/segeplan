import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';


import * as actions from '../actions';
import { SinafipService } from "../../core/services/httpServices/sinafip.service";

@Injectable()
export class PreinvDocumentEffects {

  constructor(
    private sinafipService: SinafipService,
    private actions$: Actions,
  ) { }


  readPreinvDocuments = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_PREINVDOCUMENTS),
        mergeMap(
            () => this.sinafipService.getPreinvDocument()
                .pipe(
                    map(preinvDocuments => {
                      return actions.SET_PREINVDOCUMENTS({ preinvDocuments })
                    })
                )
        )
      )
  )
}
