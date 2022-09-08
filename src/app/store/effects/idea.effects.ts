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
            (filtro) => this.generalInformationService.getIdeas({state: filtro.filtro.state})
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

  updateCreatedIdea = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.UPDATE_CREATED_IDEA),
        mergeMap(
            ({ idea }) => this.generalInformationService.submitToQualify(idea.codigo) // Enviar para Calificar,
                .pipe(
                    map(idea2 => actions.SET_SEND_IDEA({ idea }))
                )
        )
      )
  )

  updateSendIdea = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.UPDATE_SEND_IDEA),
        mergeMap(
            ({ idea }) => this.generalInformationService.qualifiedIdea(idea.codigo) // Enviar para Calificar,
                .pipe(
                    map(idea2 => actions.SET_DONE_IDEA({ idea }))
                )
        )
      )
  )

}
