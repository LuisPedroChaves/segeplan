import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs/operators';

import * as actions from '../actions';
import { ChekProjectService } from "src/app/core/services/httpServices/chek-project.service";

@Injectable()
export class CheckProjectEffects {

  constructor(
    private checkProjectService: ChekProjectService,
    private actions$: Actions,
  ) { }

  readProjects = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.READ_CHECK_PROJECTS),
        mergeMap(
          (filtro) => this.checkProjectService.getAllProjects()
            .pipe(
              map(checkProjects => actions.SET_CHECK_PROJECTS({ checkProjects }))
            )
        )
      )
  )

  createProject = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.CREATE_CHECK_PROJECT),
        mergeMap(
          ({ checkProject }) => this.checkProjectService.createProject(checkProject)
            .pipe(
              map(checkProject => actions.SET_NEW_CHECK_PROJECT({ checkProject }))
            )
        )
      )
  )

}
