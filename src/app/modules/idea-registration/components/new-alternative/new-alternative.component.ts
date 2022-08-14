import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Subscription } from 'rxjs';

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

  populationDelimitation = new FormGroup({
    referencePopulationId: new FormControl('', Validators.required),
    denominationId: new FormControl(''),
    totalPopulation: new FormControl('', [Validators.required, Validators.max(999999999999999)]),
    gender: new FormControl('Hombres', Validators.required),
    estimateBeneficiaries: new FormControl('', [Validators.required, Validators.max(999999999999999)]),
    preliminaryCharacterization: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  })

  geographicArea = new FormGroup({
    oneAvailableTerrain: new FormControl(false),
    availableTerrain: new FormControl(false),
    investPurchase: new FormControl(false),
    governmentTerrain: new FormControl(false),
    registerGovernmentTerrain: new FormControl(false),
    // Este campo solo sirve para habilitar finca folio y libro
    // No se almacena en la DB
    switchStatus: new FormControl(false),
    // ----------------------------------
    statusDescribe: new FormControl({ value: '', disabled: true }, [Validators.maxLength(200)]),
    finca: new FormControl({ value: '', disabled: true }),
    folio: new FormControl({ value: '', disabled: true }),
    libro: new FormControl({ value: '', disabled: true }),
    plano: new FormControl(false),
    slightIncline: new FormControl(false),
    broken: new FormControl(false),
    // Este campo solo sirve para habilitar imagen y descripción
    // No se almacena en la DB
    withImage: new FormControl(false),
    // ----------------------------------
    image: new FormControl({ value: '', disabled: true }),
    description: new FormControl({ value: '', disabled: true }, [Validators.maxLength(200)]),
    basicServices: new FormControl(false),
    descriptionBasicServices: new FormControl({ value: '', disabled: true }, [Validators.maxLength(200)]),
    descriptionLocation: new FormControl('', [Validators.maxLength(200)]),
  })

  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {

    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.currentIdea = state.idea;
      })

    /* #region  TERRAIN BOOLEANS */
    this.geographicArea.controls['oneAvailableTerrain'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['availableTerrain'].disable()
          this.geographicArea.controls['investPurchase'].disable()
          return
        }

        this.geographicArea.controls['availableTerrain'].enable()
        this.geographicArea.controls['investPurchase'].enable()
      });
    this.geographicArea.controls['availableTerrain'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['oneAvailableTerrain'].disable()
          this.geographicArea.controls['investPurchase'].disable()
          return
        }

        this.geographicArea.controls['oneAvailableTerrain'].enable()
        this.geographicArea.controls['investPurchase'].enable()
      });
    this.geographicArea.controls['investPurchase'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['oneAvailableTerrain'].disable()
          this.geographicArea.controls['availableTerrain'].disable()
          return
        }

        this.geographicArea.controls['oneAvailableTerrain'].enable()
        this.geographicArea.controls['availableTerrain'].enable()
      });

    this.geographicArea.controls['governmentTerrain'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['registerGovernmentTerrain'].disable()
          return
        }

        this.geographicArea.controls['registerGovernmentTerrain'].enable()
      });
    this.geographicArea.controls['registerGovernmentTerrain'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['governmentTerrain'].disable()
          return
        }

        this.geographicArea.controls['governmentTerrain'].enable()
      });

    this.geographicArea.controls['switchStatus'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['statusDescribe'].enable()
          this.geographicArea.controls['finca'].enable()
          this.geographicArea.controls['folio'].enable()
          this.geographicArea.controls['libro'].enable()
          return
        }

        this.geographicArea.controls['statusDescribe'].disable()
        this.geographicArea.controls['finca'].disable()
        this.geographicArea.controls['folio'].disable()
        this.geographicArea.controls['libro'].disable()
      });

    this.geographicArea.controls['plano'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['slightIncline'].disable()
          this.geographicArea.controls['broken'].disable()
          return
        }

        this.geographicArea.controls['slightIncline'].enable()
        this.geographicArea.controls['broken'].enable()
      });
    this.geographicArea.controls['slightIncline'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['plano'].disable()
          this.geographicArea.controls['broken'].disable()
          return
        }

        this.geographicArea.controls['plano'].enable()
        this.geographicArea.controls['broken'].enable()
      });
    this.geographicArea.controls['broken'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['slightIncline'].disable()
          this.geographicArea.controls['plano'].disable()
          return
        }

        this.geographicArea.controls['slightIncline'].enable()
        this.geographicArea.controls['plano'].enable()
      });

    this.geographicArea.controls['withImage'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['image'].enable()
          this.geographicArea.controls['description'].enable()
          return
        }

        this.geographicArea.controls['image'].disable()
        this.geographicArea.controls['description'].disable()
      });

    this.geographicArea.controls['basicServices'].valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.geographicArea.controls['descriptionBasicServices'].enable()
          return
        }

        this.geographicArea.controls['descriptionBasicServices'].disable()
      });
    /* #endregion */

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
