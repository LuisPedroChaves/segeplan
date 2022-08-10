import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { PreliminaryName } from 'src/app/core/models/alternative/PreliminaryName';
import { ResponsibleEntity } from 'src/app/core/models/alternative/ResponsibleEntity';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { IdeaStore } from 'src/app/store/reducers';
import { IdeaAlternative } from '../../../../core/models/alternative/ideaAlternative';

@Component({
  selector: 'app-new-alternative',
  templateUrl: './new-alternative.component.html',
  styleUrls: ['./new-alternative.component.scss']
})
export class NewAlternativeComponent implements OnInit {

  preliminaryName = new FormGroup({
    typeProject: new FormControl('Forma Capital Fijo', Validators.required),
    proccess: new FormControl(''),
    object: new FormControl(''),
    departament: new FormControl(''),
    municipality: new FormControl(''),
    village: new FormControl(''),
  })

  responsibleEntity = new FormGroup({
    nameEPI: new FormControl('', Validators.required),
    leaderName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  })

  PopulationDelimitation = new FormGroup({
    referencePopulationId: new FormControl('', Validators.required),
    denominationId: new FormControl(''),
    totalPopulation: new FormControl('', [Validators.required, Validators.max(999999999999999)]),
    estimateBeneficiaries: new FormControl(0, Validators.required),
    preliminaryCharacterization: new FormControl('', Validators.required),
  })

  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {

    this.ideaStoreSubscription =  this.ideaStore.select('idea')
    .subscribe(state => {
      this.currentIdea = state.idea;
    })

  }

  enableTypeProject(): void {
    const TYPE = this.preliminaryName.controls['typeProject'].value

    if (TYPE === 'Forma Capital Fijo') {
      this.preliminaryName.controls['proccess'].enable()
      this.preliminaryName.controls['object'].enable()
      this.preliminaryName.controls['departament'].enable()
      this.preliminaryName.controls['municipality'].enable()
      this.preliminaryName.controls['village'].enable()
      return
    }

    this.preliminaryName.controls['proccess'].setValue(null)
    this.preliminaryName.controls['proccess'].disable()
    this.preliminaryName.controls['object'].setValue(null)
    this.preliminaryName.controls['object'].disable()
    this.preliminaryName.controls['departament'].setValue(null)
    this.preliminaryName.controls['departament'].disable()
    this.preliminaryName.controls['municipality'].setValue(null)
    this.preliminaryName.controls['municipality'].disable()
    this.preliminaryName.controls['village'].setValue(null)
    this.preliminaryName.controls['village'].disable()
  }

  saveIdeaAlternative(): void {

    const {
      typeProject,
      proccess,
      object,
      departament,
      municipality,
      village,
    } = this.preliminaryName.value

    const PRELIMINAR_NAME: PreliminaryName = {
      typeProject,
      proccess,
      object,
      departament,
      municipality,
      village,
      preliminaryName: `A. ${proccess} B. ${object} C. ${village} ${municipality}, ${departament}`
    }

    const {
      nameEPI,
      leaderName,
      email,
      phone,
    } = this.responsibleEntity.value

    const RESPONSIBLE_ENTITY: ResponsibleEntity = {
      nameEPI,
      leaderName,
      email,
      phone,
    }


    const NEW_ALTERNATIVE: IdeaAlternative = {
      sectionBIId: null,
      preliminaryName: PRELIMINAR_NAME,
      responsibleEntity: RESPONSIBLE_ENTITY,
      populationDelimitation: null,
      geographicArea: null,
      projectDescription: null
    }

  }

}
