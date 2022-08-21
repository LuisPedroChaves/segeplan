import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPertinence } from 'src/app/core/models/adicionales/pertinence';
import { GeneralInformationService } from 'src/app/core/services/httpServices/generalInformation.service';

@Component({
  selector: 'app-new-revelance-matrix',
  templateUrl: './new-revelance-matrix.component.html',
  styleUrls: ['./new-revelance-matrix.component.scss']
})
export class NewRevelanceMatrixComponent implements OnInit {

  criterio1 = new FormGroup({
    rating: new FormControl('', Validators.required)
  })
  criterio2 = new FormGroup({
    rating: new FormControl('', Validators.required)
  })
  criterio3 = new FormGroup({
    rating: new FormControl('', Validators.required)
  })
  criterio4 = new FormGroup({
    rating: new FormControl('', Validators.required)
  })
  criterio5 = new FormGroup({
    rating: new FormControl('', Validators.required)
  })
  criterio6 = new FormGroup({
    rating: new FormControl('', Validators.required)
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

  constructor(private generalInformationService: GeneralInformationService) {
    this.generalInformationService.getMatrizPertinencia('9c0af3f9-d55b-4a50-8ce0-5bff6d409b48').subscribe((res: any) => {
      this.matrix = res;
      console.log(this.matrix)
    })
   }

  ngOnInit(): void {

  }

}
