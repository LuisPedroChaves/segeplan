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
        // map(() => actions.SET_IDEAS({ ideas: [
        //   {
        //     "productId": "1",
        //     "productName": "Producto 3",
        //     "date": "2022-08-09T17:37:17.713Z",
        //     "planningInstrument": true,
        //     "description": "\nfdg fdgsdfgdfsgsd sgdfgsdfgdfg dfg\nDescripción *\nSegún la respuesta anterior se justifica si la idea de proyecto proviene de algún instrumento de planificación, PEI, PDM-OT, agregar otro. Hasta 200",
        //     "idEntity": "",
        //     "nameEntity": "",
        //     "responsibleName": "Luis Pedro Chaves",
        //     "email": "mail@mail.com",
        //     "phone": "22332233",
        //     "possibleEffects": [
        //       {
        //         "description": "Efecto 1"
        //       },
        //       {
        //         "description": "Efecto 2"
        //       },
        //       {
        //         "description": "Efecto 3"
        //       }
        //     ],
        //     "definitionPotentiality": "sjdjklfjsdkl f;sdklfj;skldjf;ioejlsdjflis dl;fkj3el;ijsl;dkfjlskdjflksjdklfj",
        //     "possibleCauses": [
        //       {
        //         "description": "Causa 1"
        //       },
        //       {
        //         "description": "Causa 2"
        //       },
        //       {
        //         "description": "Causa 3"
        //       }
        //     ],
        //     "baseLine": "Indice de analfabetismo 75% en 2020",
        //     "descriptionCurrentSituation": "skldfjlskdjf ;lskdjfl;skdjfl;sidfjskldjflksdjflk sdlkf",
        //     "generalObjective": "sdfoasjdfklas ;dlfkajs;dlkfjas;difjlkejl;isd f;lskdjflisejl;ksjfliej fl;ksjdfli liesj sd",
        //     "expectedChange": "sdfoasjdfklas ;dlfkajs;dlkfjas;difjlkejl;isd f;lskdjflisejl;ksjfliej fl;ksjdfli liesj sd",
        //     "possibleAlternatives": [
        //       {
        //         "description": "Alternativa 1"
        //       },
        //       {
        //         "description": "Alternativa 2"
        //       }
        //     ],
        //     alternatives: []
        //   },
        //   {
        //     "productId": "1",
        //     "productName": "Producto 3",
        //     "date": "2022-08-09T17:37:17.713Z",
        //     "planningInstrument": true,
        //     "description": "\nfdg fdgsdfgdfsgsd sgdfgsdfgdfg dfg\nDescripción *\nSegún la respuesta anterior se justifica si la idea de proyecto proviene de algún instrumento de planificación, PEI, PDM-OT, agregar otro. Hasta 200",
        //     "idEntity": "",
        //     "nameEntity": "",
        //     "responsibleName": "Luis Pedro Chaves",
        //     "email": "mail@mail.com",
        //     "phone": "22332233",
        //     "possibleEffects": [
        //       {
        //         "description": "Efecto 1"
        //       },
        //       {
        //         "description": "Efecto 2"
        //       },
        //       {
        //         "description": "Efecto 3"
        //       }
        //     ],
        //     "definitionPotentiality": "sjdjklfjsdkl f;sdklfj;skldjf;ioejlsdjflis dl;fkj3el;ijsl;dkfjlskdjflksjdklfj",
        //     "possibleCauses": [
        //       {
        //         "description": "Causa 1"
        //       },
        //       {
        //         "description": "Causa 2"
        //       },
        //       {
        //         "description": "Causa 3"
        //       }
        //     ],
        //     "baseLine": "Indice de analfabetismo 75% en 2020",
        //     "descriptionCurrentSituation": "skldfjlskdjf ;lskdjfl;skdjfl;sidfjskldjflksdjflk sdlkf",
        //     "generalObjective": "sdfoasjdfklas ;dlfkajs;dlkfjas;difjlkejl;isd f;lskdjflisejl;ksjfliej fl;ksjdfli liesj sd",
        //     "expectedChange": "sdfoasjdfklas ;dlfkajs;dlkfjas;difjlkejl;isd f;lskdjflisejl;ksjfliej fl;ksjdfli liesj sd",
        //     "possibleAlternatives": [
        //       {
        //         "description": "Alternativa 1"
        //       },
        //       {
        //         "description": "Alternativa 2"
        //       }
        //     ],
        //     alternatives: []
        //   },
        //   {
        //     "productId": "1",
        //     "productName": "Producto 3",
        //     "date": "2022-08-09T17:37:17.713Z",
        //     "planningInstrument": true,
        //     "description": "\nfdg fdgsdfgdfsgsd sgdfgsdfgdfg dfg\nDescripción *\nSegún la respuesta anterior se justifica si la idea de proyecto proviene de algún instrumento de planificación, PEI, PDM-OT, agregar otro. Hasta 200",
        //     "idEntity": "",
        //     "nameEntity": "",
        //     "responsibleName": "Luis Pedro Chaves",
        //     "email": "mail@mail.com",
        //     "phone": "22332233",
        //     "possibleEffects": [
        //       {
        //         "description": "Efecto 1"
        //       },
        //       {
        //         "description": "Efecto 2"
        //       },
        //       {
        //         "description": "Efecto 3"
        //       }
        //     ],
        //     "definitionPotentiality": "sjdjklfjsdkl f;sdklfj;skldjf;ioejlsdjflis dl;fkj3el;ijsl;dkfjlskdjflksjdklfj",
        //     "possibleCauses": [
        //       {
        //         "description": "Causa 1"
        //       },
        //       {
        //         "description": "Causa 2"
        //       },
        //       {
        //         "description": "Causa 3"
        //       }
        //     ],
        //     "baseLine": "Indice de analfabetismo 75% en 2020",
        //     "descriptionCurrentSituation": "skldfjlskdjf ;lskdjfl;skdjfl;sidfjskldjflksdjflk sdlkf",
        //     "generalObjective": "sdfoasjdfklas ;dlfkajs;dlkfjas;difjlkejl;isd f;lskdjflisejl;ksjfliej fl;ksjdfli liesj sd",
        //     "expectedChange": "sdfoasjdfklas ;dlfkajs;dlkfjas;difjlkejl;isd f;lskdjflisejl;ksjfliej fl;ksjdfli liesj sd",
        //     "possibleAlternatives": [
        //       {
        //         "description": "Alternativa 1"
        //       },
        //       {
        //         "description": "Alternativa 2"
        //       }
        //     ],
        //     alternatives: []
        //   }
        // ] }))
      )
  )

  createIdea = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.CREATE_IDEA),
        // mergeMap(
        //     ({ idea }) => this.generalInformationService.sendGeneralInformation(idea)
        //         .pipe(
        //             map(idea => actions.SET_NEW_IDEA({ idea }))
        //         )
        // )
        map(({ idea }) => actions.SET_NEW_IDEA({ idea }))
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
