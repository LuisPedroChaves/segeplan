import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, distinctUntilChanged, Subscription } from 'rxjs';
import { Coordinates } from 'src/app/core/models/alternative/Coordinates';
import { ExecutionTime } from 'src/app/core/models/alternative/ExecutionTime';
import { GeographicArea } from 'src/app/core/models/alternative/GeographicArea';
import { PopulationDelimitation } from 'src/app/core/models/alternative/PopulationDelimitation';

import { PreliminaryName } from 'src/app/core/models/alternative/PreliminaryName';
import { ProjectDescription } from 'src/app/core/models/alternative/ProjectDescription';
import { ResponsibleEntity } from 'src/app/core/models/alternative/ResponsibleEntity';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { GeograficoStore, IdeaStore, ObjectStore, ProcesoStore } from 'src/app/store/reducers';
import { IdeaAlternative } from '../../../../core/models/alternative/ideaAlternative';
import { Denomination } from '../../../../core/models/alternative/Denomination';
import { Departament } from '../../../../core/models/adicionales/department';
import { IObject } from '../../../../core/models/adicionales/objeto';
import { Procesos, Process } from '../../../../core/models/adicionales/process';
import { DenominationStore } from '../../../../store/reducers/denomination.reducer';
import { READ_DENOMINATIONS } from '../../../../store/actions/denomination.actions';
import { READ_GEOGRAFICOS } from '../../../../store/actions/geografico.actions';
import { READ_OBJECTS } from '../../../../store/actions/object.actions';
import { READ_PROCESOS } from '../../../../store/actions/proceso.actions';
import { GeneralInformationService } from '../../../../core/services/httpServices/generalInformation.service';
import { CLOSE_FULL_DRAWER } from '../../../../store/actions';
import { ReferencePopulation } from '../../../../core/models/alternative/ReferencePopulation';
import { ReferenceStore } from '../../../../store/reducers/popRef.reducer';
import { READ_REFERENCES } from '../../../../store/actions/popRef.actions';

@Component({
  selector: 'app-new-alternative',
  templateUrl: './new-alternative.component.html',
  styleUrls: ['./new-alternative.component.scss']
})
export class NewAlternativeComponent implements OnInit {

  // Catalogos
  references: ReferencePopulation[] = [];
  referenceStoreSubscription = new Subscription();

  denominations: Denomination[] = [];
  denominationStoreSubscription = new Subscription();

  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();

  objetos: IObject[] = [];
  objetoStoreSubscription = new Subscription();

  processes: Procesos = {noFormaCapital: [], formaCapital: []};
  processStoreSubscription = new Subscription();

  dataSourceProcesos: Process[] = [];

  // END Catalogos

  /* #region  Formularios */
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
    referencePopulation: new FormControl('', Validators.required),
    denomination: new FormControl(''),
    totalPopulation: new FormControl<number>(null, [Validators.required, Validators.max(999999999999999)]),
    gender: new FormControl('Hombres', Validators.required),
    estimateBeneficiaries: new FormControl<number>(null, [Validators.required, Validators.max(999999999999999)]),
    preliminaryCharacterization: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  })

  get formCoordinates(): FormArray {
    return this.geographicArea.get('coordinates') as FormArray;
  }

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
    coordinates: this.FormBuilder.array<Coordinates>([]),
    descriptionLocation: new FormControl('', [Validators.maxLength(200)]),
  })

  projectDescription = new FormGroup({
    projectType: new FormControl(null, Validators.required),
    formulationProcess: new FormControl(null, Validators.required),
    formulationProcessDescription: new FormControl('', [Validators.maxLength(200)]),
    descriptionInterventions: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    complexity: new FormControl('', Validators.required),
    estimatedCost: new FormControl<number>(null, Validators.required),
    investmentCost: new FormControl<number>(null, Validators.required),
    foundingSourcesName: new FormControl(null, Validators.required),
  })

  executionTime = new FormGroup({
    tentativeTermMonth: new FormControl('', Validators.required),
    tentativeTermYear: new FormControl('', Validators.required),
    executionDateMonth: new FormControl('', Validators.required),
    executionDateYear: new FormControl('', Validators.required),
    finishDateMonth: new FormControl('', Validators.required),
    finishDateYear: new FormControl('', Validators.required),
    annual: new FormControl(true, Validators.required),
  })

  coordinatesColumns: string[] = ['geoAreaId', 'latitude', 'length', 'remove'];
  coordinatesSource = new BehaviorSubject<AbstractControl[]>([]);
  /* #endregion */

  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;

  constructor(
    private ideaStore: Store<IdeaStore>,
    private referenceStore: Store<ReferenceStore>,
    private denominationStore: Store<DenominationStore>,
    private geograficoStore: Store<GeograficoStore>,
    private objectStore: Store<ObjectStore>,
    private procesoStore: Store<ProcesoStore>,
    private generalInformationService: GeneralInformationService,
    private FormBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    //#region Catalogos
    this.denominationStoreSubscription = this.denominationStore.select('denomination')
      .subscribe(state => {
        this.denominations = state.denominations;
      })

    this.denominationStore.dispatch(READ_DENOMINATIONS())

    this.departamentoStoreSubscription = this.geograficoStore.select('geografico')
      .subscribe(state => {
        this.departamentos = state.geograficos;
      })

    this.geograficoStore.dispatch(READ_GEOGRAFICOS())


    this.objetoStoreSubscription = this.objectStore.select('object')
      .subscribe(state => {
        this.objetos = state.objects;
      })

    this.objectStore.dispatch(READ_OBJECTS())

    this.processStoreSubscription = this.procesoStore.select('proceso')
      .subscribe(state => {
        this.processes = state.procesos;
        this.dataSourceProcesos = this.processes.formaCapital;

      })

    this.procesoStore.dispatch(READ_PROCESOS())


    this.referenceStoreSubscription = this.referenceStore.select('reference')
    .subscribe(state => {
      this.references = state.references;
    })

    this.referenceStore.dispatch(READ_REFERENCES())

    //#endregion

    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.currentIdea = state.idea;
      })

    this.terrainValidators()
  }

  terrainValidators(): void {
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

          this.geographicArea.controls['governmentTerrain'].disable()
          this.geographicArea.controls['registerGovernmentTerrain'].disable()
          this.geographicArea.controls['statusDescribe'].disable()
          this.geographicArea.controls['finca'].disable()
          this.geographicArea.controls['folio'].disable()
          this.geographicArea.controls['libro'].disable()
          this.geographicArea.controls['plano'].disable()
          this.geographicArea.controls['slightIncline'].disable()
          this.geographicArea.controls['broken'].disable()
          this.geographicArea.controls['image'].disable()
          this.geographicArea.controls['description'].disable()
          this.geographicArea.controls['basicServices'].disable()
          this.geographicArea.controls['descriptionBasicServices'].disable()
          this.geographicArea.controls['descriptionLocation'].disable()
          this.geographicArea.controls['coordinates'].disable()
          this.geographicArea.controls['switchStatus'].disable()
          this.geographicArea.controls['withImage'].disable()
          return
        }

        this.geographicArea.controls['oneAvailableTerrain'].enable()
        this.geographicArea.controls['availableTerrain'].enable()
        this.geographicArea.controls['governmentTerrain'].enable()
        this.geographicArea.controls['registerGovernmentTerrain'].enable()
        this.geographicArea.controls['plano'].enable()
        this.geographicArea.controls['slightIncline'].enable()
        this.geographicArea.controls['broken'].enable()
        this.geographicArea.controls['basicServices'].enable()
        this.geographicArea.controls['descriptionLocation'].enable()
        this.geographicArea.controls['coordinates'].enable()
        this.geographicArea.controls['switchStatus'].enable()
        this.geographicArea.controls['withImage'].enable()
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
  }

  addCoordinates(): void {
    const NEW_DETAIL: FormGroup = this.FormBuilder.group({
      geographicAreaId: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      length: new FormControl('', Validators.required),
    });
    this.formCoordinates.push(NEW_DETAIL);

    this.coordinatesSource.next(this.formCoordinates.controls);
  }

  removeCoordinates(index: number): void {
    this.formCoordinates.removeAt(index);
    this.coordinatesSource.next(this.formCoordinates.controls);
  }

  selecDepartament(): void {
    let dptoSelect = this.preliminaryName.controls['departament'].value;
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto){this.municipios = dpto.municipios }
  }

  enableTypeProject(): void {
    const TYPE = this.preliminaryName.controls['typeProject'].value

    if (TYPE === 'Forma Capital Fijo') {
      this.dataSourceProcesos = this.processes.formaCapital
      // this.preliminaryName.controls['proccess'].enable()
      // this.preliminaryName.controls['object'].enable()
      // this.preliminaryName.controls['departament'].enable()
      // this.preliminaryName.controls['municipality'].enable()
      this.preliminaryName.controls['village'].enable()
      return
    }

    this.preliminaryName.controls['proccess'].setValue(null)
    this.dataSourceProcesos = this.processes.noFormaCapital
    // this.preliminaryName.controls['proccess'].disable()
    this.preliminaryName.controls['object'].setValue(null)
    // this.preliminaryName.controls['object'].disable()
    this.preliminaryName.controls['departament'].setValue(null)
    // this.preliminaryName.controls['departament'].disable()
    this.preliminaryName.controls['municipality'].setValue(null)
    // this.preliminaryName.controls['municipality'].disable()
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
      preliminaryName: `A. ${proccess} B. ${object} C. ${municipality}, ${departament}`
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

    const {
      referencePopulation,
      denomination,
      totalPopulation,
      gender,
      estimateBeneficiaries,
      preliminaryCharacterization,
    } = this.populationDelimitation.value

    const POPULATION_DELIMITATION: PopulationDelimitation = {
      refPopId: referencePopulation,
      denId: denomination,
      totalPopulation,
      gender,
      estimateBeneficiaries,
      preliminaryCharacterization,
    }

    const {
      availableTerrain,
      oneAvailableTerrain,
      investPurchase,
      governmentTerrain,
      registerGovernmentTerrain,
      statusDescribe,
      finca,
      folio,
      libro,
      plano,
      slightIncline,
      broken,
      image,
      description,
      basicServices,
      descriptionBasicServices,
      descriptionLocation,
      coordinates
    } = this.geographicArea.value

    const GEOGRAPHIC_AREA: GeographicArea = {
      availableTerrain,
      oneAvailableTerrain,
      investPurchase,
      governmentTerrain,
      registerGovernmentTerrain,
      statusDescribe,
      finca,
      folio,
      libro,
      plano,
      slightIncline,
      broken,
      image,
      description,
      basicServices,
      descriptionBasicServices,
      descriptionLocation,
      coordinates
    }

    const {
      tentativeTermMonth,
      tentativeTermYear,
      executionDateMonth,
      executionDateYear,
      finishDateMonth,
      finishDateYear,
      annual
    } = this.executionTime.value

    const EXECUTION_TIME: ExecutionTime = {
      tentativeTermMonth,
      tentativeTermYear,
      executionDateMonth,
      executionDateYear,
      finishDateMonth,
      finishDateYear,
      annual: 0
    }

    if (this.executionTime.value.annual) {
      EXECUTION_TIME.annual = 1
    } else if (!this.executionTime.value.annual) {
      EXECUTION_TIME.annual = 0
    }

    const {
      projectType,
      formulationProcess,
      formulationProcessDescription,
      descriptionInterventions,
      complexity,
      estimatedCost,
      investmentCost,
      foundingSourcesName,
    } = this.projectDescription.value

    const PROJECT_DESCRIPTION: ProjectDescription = {
      projectType,
      formulationProcess,
      formulationProcessDescription,
      descriptionInterventions,
      complexity,
      estimatedCost,
      investmentCost,
      foundingSourcesName,
      fundingSources: 1,
      execTime: EXECUTION_TIME
    }

    const NEW_ALTERNATIVE: IdeaAlternative = {
      sectionBIId: this.currentIdea.codigo,
      preName: PRELIMINAR_NAME,
      resEntity: RESPONSIBLE_ENTITY,
      popDelimit: POPULATION_DELIMITATION,
      geoArea: GEOGRAPHIC_AREA,
      projDesc: PROJECT_DESCRIPTION
    }
    console.log("🚀 ~ file: new-alternative.component.ts ~ line 499 ~ NewAlternativeComponent ~ saveIdeaAlternative ~ NEW_ALTERNATIVE", NEW_ALTERNATIVE)
    //TODO: Enlazar con servicio


    this.generalInformationService.sendAlternative(NEW_ALTERNATIVE).subscribe((res: any) => {
      this.ideaStore.dispatch(CLOSE_FULL_DRAWER())
    });
  }

}
