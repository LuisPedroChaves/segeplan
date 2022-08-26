import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';

import { IPertinence } from 'src/app/core/models/adicionales/pertinence';
import { GeneralInformationService } from 'src/app/core/services/httpServices/generalInformation.service';
import { IdeaAlternative } from 'src/app/core/models/alternative/ideaAlternative';
import { AlternativeStore } from 'src/app/store/reducers';
import { Qualification } from '../../../../core/models/alternative/Qyualification';
import { preInvestmentResult } from '../../../../core/models/alternative/preInvestmentResult';

@Component({
  selector: 'app-new-revelance-matrix',
  templateUrl: './new-revelance-matrix.component.html',
  styleUrls: ['./new-revelance-matrix.component.scss']
})
export class NewRevelanceMatrixComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') stepper: MatStepper;

  alternativeStoreSubscription = new Subscription()

  currentAlternative: IdeaAlternative = null!;

  relevanceMatrix: Qualification = null!;
  preInvestment: preInvestmentResult = null!;

  totalMatrix = 0;

  loadingPre = false;
  preSend = false;

  criterio1 = new FormGroup({
    descProblem: new FormControl('', Validators.required),
    descProblemComment: new FormControl(''),
  })
  criterio2 = new FormGroup({
    generalObjct: new FormControl('', Validators.required),
    generalObjctComment: new FormControl(''),
  })
  criterio3 = new FormGroup({
    anlysDelimitation: new FormControl('', Validators.required),
    anlysDelimitationComment: new FormControl(''),
  })
  criterio4 = new FormGroup({
    terrainIdent: new FormControl('', Validators.required),
    terrainIdentComment: new FormControl(''),
  })
  criterio5 = new FormGroup({
    legalSituation: new FormControl('', Validators.required),
    legalSituationComment: new FormControl(''),
  })
  criterio6 = new FormGroup({
    descAnlys: new FormControl('', Validators.required),
    descAnlysComment: new FormControl(''),
  })
  resume = new FormGroup({
    descriptionGeneral: new FormControl(''),
  })

  matrix: IPertinence = {
    "criterio1": {
      "baseLine": "índice de analfabetismo =75% para el año 20XX"
    },
    "criterio2": {
      "generalObjective": "Descripción de objetivo general ",
      "expectedChange": "Resultado o cambio esperado respecto a indicadores       (resultado final) "
    },
    "criterio3": {
      "totalPopulation": 1000,
      "gender": null,
      "estimateBeneficiaries": 10,
      "preliminaryCharacterization": "prueba",
      "coverage": 1,
      "referencePopulation": "Nacional",
      "denomination": "Alumnos"
    },
    "criterio4": {
      "availableTerrain": false,
      "oneAvailableTerrain": true,
      "investPurchase": false
    },
    "criterio5": {
      "registerGovernmentTerrain": true,
      "statusDescribe": "prueba descripcion"
    },
    "criterio6": {
      "projectType": "Proyecto 1",
      "formulationProcess": "proceso de formulario",
      "descriptionInterventions": "string...",
      "complexity": "string"
    }
  }

  ratingGroups: any = [
    {
      name: 'EXCELENTE',
      ratings: [10]
    },
    {
      name: 'BUENO',
      ratings: [9, 8]
    },
    {
      name: 'ACEPTABLE',
      ratings: [7, 6]
    },
    {
      name: 'DEFICIENTE',
      ratings: [5, 4]
    },
    {
      name: 'REPLANTEAR',
      ratings: [3, 2, 1]
    },
  ]

  constructor(private generalInformationService: GeneralInformationService,
    private alternativeStore: Store<AlternativeStore>,
  ) { }

  ngOnInit(): void {
    this.alternativeStoreSubscription = this.alternativeStore.select('alternative')
      .subscribe(state => {
        this.currentAlternative = state.alternative
        this.getMatrix();
        if (this.stepper) {
          this.stepper.reset()
        }
      })
  }

  getMatrix(): void {
    this.generalInformationService.getMatrizPertinencia(this.currentAlternative.codigo).subscribe((res: any) => {
      this.matrix = res;
      console.log(this.matrix)
    })
  }

  loadMatrix(): void {

    let rsult = ''
    let valProblem = parseInt(this.criterio1.value.descProblem, 10) * 2;
    let valObjGeneral = parseInt(this.criterio2.value.generalObjct, 10) * 2;
    let valDelimit = parseInt(this.criterio3.value.anlysDelimitation, 10) * 2;
    let valAnlys = parseInt(this.criterio6.value.descAnlys, 10) * 2;

    this.totalMatrix = valProblem + valObjGeneral + valDelimit + valAnlys
      + parseInt(this.criterio4.value.terrainIdent, 10) + parseInt(this.criterio5.value.legalSituation, 10);

    if (this.totalMatrix >= 60) {
      rsult = 'PERTINENTE'
    } else { rsult = 'NO PERTINENTE' }
    //
    this.relevanceMatrix = {
      AlterId: this.currentAlternative.codigo,
      descProblem: valProblem,
      descProblemComment: this.criterio1.value.descProblemComment,
      generalObjct: valObjGeneral,
      generalObjctComment: this.criterio2.value.generalObjctComment,
      anlysDelimitation: valDelimit,
      anlysDelimitationComment: this.criterio3.value.anlysDelimitationComment,
      terrainIdent: parseInt(this.criterio4.value.terrainIdent, 10),
      terrainIdentComment: this.criterio4.value.terrainIdentComment,
      legalSituation: parseInt(this.criterio5.value.legalSituation, 10),
      legalSituationComment: this.criterio5.value.legalSituationComment,
      descAnlys: valAnlys,
      descAnlysComment: this.criterio6.value.descAnlysComment,
      total: this.totalMatrix,
      result: rsult
    }

    console.log(
      this.relevanceMatrix
    )
  }

  ngOnDestroy(): void {
    this.alternativeStoreSubscription?.unsubscribe()
  }

  generateMatrixPreinvent(): void {
    this.loadingPre = true;
    this.preSend = true;

    this.generalInformationService.getMatrizPreinversion(this.currentAlternative.codigo).subscribe((res: any) => {
      this.preInvestment = res;
      console.log(res)
      this.loadingPre = false;
    })
  }

  savePertinenceMatrix(): void {
    this.relevanceMatrix.descriptionGeneral = this.resume.value.descriptionGeneral;

    this.generalInformationService.saveMatrixPertinence(this.relevanceMatrix).subscribe((res: any) => {
      console.log(res)
    })
  }


}
function viewChild(arg0: string) {
  throw new Error('Function not implemented.');
}
