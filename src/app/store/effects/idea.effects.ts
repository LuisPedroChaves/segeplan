import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';
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
        mergeMap(
            () => this.generalInformationService.getIdeas()
                .pipe(
                    map(ideas => actions.SET_IDEAS({ ideas }))
                )
        )
        // map(() => actions.SET_IDEAS({ ideas: [] }))
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
        // map(({ idea }) => actions.SET_NEW_IDEA({ idea }))
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