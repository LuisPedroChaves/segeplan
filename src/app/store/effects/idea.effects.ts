import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';
import { FiltroIdeas } from "../../core/models/adicionales/filtroIdeas";
import { GeneralInformationService } from "../../core/services/httpServices/generalInformation.service";


import * as actions from '../actions';

@Injectable()
export class IdeaEffects {

  constructor(
    private generalInformationService: GeneralInformationService,
    private actions$: Actions,
  ) { }

  readIdeas = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_IDEAS),
        //TODO: AGREGAR A LOS FILTROS EL ID DE LA INSTITUCION CUANDO SE TENGA EL LOGIN
        mergeMap(
            () => this.generalInformationService.getIdeas({state: 'CREADA'})
                .pipe(
                    map(ideas => actions.SET_IDEAS({ ideas }))
                )
        )
      )
  )

  readSendIdeas = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_SEND_IDEAS),
        mergeMap(
            (filtro) => this.generalInformationService.getIdeas({state: 'ENVIADA'})
                .pipe(
                    map(ideas => actions.SET_SEND_IDEAS({ ideas }))
                )
        )
      )
  )

  readDoneIdeas = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_DONE_IDEAS),
        mergeMap(
            (filtro) => this.generalInformationService.getIdeas({state: 'CALIFICADA'})
                .pipe(
                    map(ideas => actions.SET_DONE_IDEAS({ ideas }))
                )
        )
      )
  )

  createIdea = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.CREATE_IDEA),
        mergeMap(
            ({ idea }) => this.generalInformationService.sendGeneralInformation(idea)
                .pipe(
                    map(idea => actions.SET_NEW_IDEA({ idea }))
                )
        )
      )
  )

  updateIdea = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.UPDATE_IDEA),
        // mergeMap(
        //     ({ idea }) => this.ideaService.update(idea)
        //         .pipe(
        //             map(idea => actions.SET_EDIT_IDEA({ idea }))
        //         )
        // )
        map(({ idea }) => actions.SET_EDIT_IDEA({ idea }))
      )
  )

}
