import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { AlternativeStore, DenominationStore, GeograficoStore, IdeaStore, ObjectStore, ProcesoStore, ReferenceStore } from 'src/app/store/reducers';
import { GeneralInformationService } from '../../../../core/services/httpServices/generalInformation.service';
import { CLOSE_FULL_DRAWER, CLOSE_FULL_DRAWER2, DELETE_DATA_GEOS, OPEN_FORM_DRAWER, READ_DENOMINATIONS, READ_GEOGRAFICOS, READ_PROCESOS, READ_REFERENCES, REMOVE_DATA_GEO, SET_IDEA_ALTERNATIVES } from '../../../../store/actions';
import { MatStepper } from '@angular/material/stepper';
import { AppState } from '../../../../store/app.reducer';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../../../shared/components/alert-dialog/alert-dialog.component';
import { READ_OBJECTS } from '../../../../store/actions/object.actions';
import { User, ReferencePopulation, Denomination, Departament, IObject, Procesos, Process, GeneralInformation, IdeaAlternative, DataGeo, PreliminaryName, ResponsibleEntity, PopulationDelimitation, GeographicArea, ExecutionTime, ProjectDescription } from '../../../../core/models';

@Component({
  selector: 'app-new-alternative',
  templateUrl: './new-alternative.component.html',
  styleUrls: ['./new-alternative.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class NewAlternativeComponent implements OnInit, OnDestroy {

  coverageText = '0'

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('scrollMe') myScrollContainer: ElementRef;

  sessionSubscription: Subscription;
  usuario!: User;
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

  processes: Procesos = { noFormaCapital: [], formaCapital: [] };
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
    referencePopulation: new FormControl('Departamental', Validators.required),
    denomination: new FormControl(''),
    totalPopulation: new FormControl<number>(100, [Validators.required, Validators.max(999999999999999)]),
    gender: new FormControl('Hombres', Validators.required),
    estimateBeneficiaries: new FormControl<number>(100, [Validators.required, Validators.max(999999999999999)]),
    preliminaryCharacterization: new FormControl('detalles', [Validators.required, Validators.maxLength(500)]),
  })

  geographicArea = new FormGroup({
    oneAvailableTerrain: new FormControl(false),
    availableTerrain: new FormControl(false),
    investPurchase: new FormControl(false),
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
  /* #endregion */

  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;

  alternativeStoreSubscription = new Subscription()
  currentAlternative: IdeaAlternative
  dataGeos: DataGeo[] = [];
  displayedColumns = ['statusDescribe', 'actions'];
  dataSource = new MatTableDataSource<DataGeo>([])

  constructor(
    private ideaStore: Store<IdeaStore>,
    private referenceStore: Store<ReferenceStore>,
    private denominationStore: Store<DenominationStore>,
    private geograficoStore: Store<GeograficoStore>,
    private objectStore: Store<ObjectStore>,
    private procesoStore: Store<ProcesoStore>,
    private generalInformationService: GeneralInformationService,
    public store: Store<AppState>,
    public alternativeStore: Store<AlternativeStore>,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {

    this.sessionSubscription = this.store.select('session').subscribe(session => {
      this.usuario = session.session.usuario;
      this.responsibleEntity.setValue({
        nameEPI: this.usuario?.name_inst,
        leaderName: 'Luis',
        email: 'mail@mail.com',
        phone: '22112211',
      })

    });

    this.alternativeStoreSubscription = this.alternativeStore.select('alternative')
      .subscribe(state => {

        if (state.alternative) {
          this.currentAlternative = state.alternative
          this.setEditValues()
        } else {
          this.currentAlternative = null
          this.stepper.reset();
        }

        this.dataGeos = state.dataGeos
        this.dataSource = new MatTableDataSource<DataGeo>(this.dataGeos)
      })

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

  ngOnDestroy(): void {
    this.sessionSubscription?.unsubscribe()
    this.referenceStoreSubscription?.unsubscribe()
    this.denominationStoreSubscription?.unsubscribe()
    this.departamentoStoreSubscription?.unsubscribe()
    this.objetoStoreSubscription?.unsubscribe()
    this.processStoreSubscription?.unsubscribe()

    this.ideaStoreSubscription?.unsubscribe()
    this.alternativeStoreSubscription?.unsubscribe()
  }

  openFormDrawer(formTitle: string, formComponent: string): void {
    this.ideaStore.dispatch(OPEN_FORM_DRAWER({ formTitle, formComponent }))
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
          return
        }

        this.geographicArea.controls['oneAvailableTerrain'].enable()
        this.geographicArea.controls['availableTerrain'].enable()
      });
  }

  selecDepartament(): void {
    let dptoSelect = this.preliminaryName.controls['departament'].value;
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto) { this.municipios = dpto.municipios }
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

  scrollToTop(): void {
    setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = 0;
    }, 500);
  }

  removeDataGeo(dataGeo: DataGeo): void {
    this.alternativeStore.dispatch(REMOVE_DATA_GEO({ dataGeo }))
  }

  setEditValues(): void {

    this.preliminaryName.controls['typeProject'].setValue(this.currentAlternative.preName.typeProject)
    this.preliminaryName.controls['proccess'].setValue(this.currentAlternative.preName.proccess)
    this.preliminaryName.controls['object'].setValue(this.currentAlternative.preName.object)
    this.preliminaryName.controls['departament'].setValue(this.currentAlternative.preName.departament)
    this.preliminaryName.controls['municipality'].setValue(this.currentAlternative.preName.municipality)
    this.preliminaryName.controls['village'].setValue(this.currentAlternative.preName.village)

    this.responsibleEntity.controls['nameEPI'].setValue(this.currentAlternative.resEntity.nameEPI)
    this.responsibleEntity.controls['leaderName'].setValue(this.currentAlternative.resEntity.leaderName)
    this.responsibleEntity.controls['email'].setValue(this.currentAlternative.resEntity.email)
    this.responsibleEntity.controls['phone'].setValue(this.currentAlternative.resEntity.phone)

    this.populationDelimitation.controls['referencePopulation'].setValue(this.currentAlternative.popDelimit.refPop.name)
    this.populationDelimitation.controls['denomination'].setValue(this.currentAlternative.popDelimitdenmtion.name)
    this.populationDelimitation.controls['totalPopulation'].setValue(this.currentAlternative.popDelimit.totalPopulation)
    this.populationDelimitation.controls['gender'].setValue(this.currentAlternative.popDelimit.gender)
    this.populationDelimitation.controls['estimateBeneficiaries'].setValue(this.currentAlternative.popDelimit.estimateBeneficiaries)
    this.populationDelimitation.controls['preliminaryCharacterization'].setValue(this.currentAlternative.popDelimit.preliminaryCharacterization)

    this.geographicArea.controls['oneAvailableTerrain'].setValue(this.currentAlternative.geoArea.oneAvailableTerrain)
    this.geographicArea.controls['availableTerrain'].setValue(this.currentAlternative.geoArea.availableTerrain)
    this.geographicArea.controls['investPurchase'].setValue(this.currentAlternative.geoArea.investPurchase)

    this.projectDescription.controls['projectType'].setValue(this.currentAlternative.projDesc.projectType)
    this.projectDescription.controls['formulationProcess'].setValue(this.currentAlternative.projDesc.formulationProcess)
    this.projectDescription.controls['formulationProcessDescription'].setValue(this.currentAlternative.projDesc.formulationProcessDescription)
    this.projectDescription.controls['descriptionInterventions'].setValue(this.currentAlternative.projDesc.descriptionInterventions)
    this.projectDescription.controls['complexity'].setValue(this.currentAlternative.projDesc.complexity)
    this.projectDescription.controls['estimatedCost'].setValue(this.currentAlternative.projDesc.estimatedCost)
    this.projectDescription.controls['investmentCost'].setValue(this.currentAlternative.projDesc.investmentCost)
    this.projectDescription.controls['foundingSourcesName'].setValue(this.currentAlternative.projDesc.foundingSourcesName)

    this.executionTime.controls['tentativeTermMonth'].setValue(this.currentAlternative.projDesc.execTime.tentativeTermMonth)
    this.executionTime.controls['tentativeTermYear'].setValue(this.currentAlternative.projDesc.execTime.tentativeTermYear)
    this.executionTime.controls['executionDateMonth'].setValue(this.currentAlternative.projDesc.execTime.executionDateMonth)
    this.executionTime.controls['executionDateYear'].setValue(this.currentAlternative.projDesc.execTime.executionDateYear)
    this.executionTime.controls['finishDateMonth'].setValue(this.currentAlternative.projDesc.execTime.finishDateMonth)
    this.executionTime.controls['finishDateYear'].setValue(this.currentAlternative.projDesc.execTime.finishDateYear)
    this.executionTime.controls['annual'].setValue(Boolean(this.currentAlternative.projDesc.execTime.annual))

    setTimeout(() => {

      this.selecDepartament()

    }, 500);
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
      preliminaryName: `${proccess}, ${object}, ${municipality}, ${departament}`
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
    } = this.geographicArea.value

    const GEOGRAPHIC_AREA: GeographicArea = {
      availableTerrain,
      oneAvailableTerrain,
      investPurchase,
      dataGeo: this.dataGeos
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

    if (tentativeTermYear > executionDateYear && tentativeTermYear > finishDateYear && executionDateYear > finishDateYear) {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '250px',
        data: { title: 'Error al seleccionar Fechas', description: 'Verifique que las fechas seleccionadas cumplan con un periodo de trabajo real.' }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
      return;
    }

    // editar
    if (this.currentAlternative) {

      this.currentAlternative = {
        ...this.currentAlternative,
        preName: PRELIMINAR_NAME,
        resEntity: RESPONSIBLE_ENTITY,
        popDelimit: POPULATION_DELIMITATION,
        geoArea: GEOGRAPHIC_AREA,
        projDesc: PROJECT_DESCRIPTION
      }

      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '250px',
        data: { title: 'Editar Alternativa', description: '¿Esta Seguro que desea guardar los datos de la Alternativa?', confirmation: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        if (result === true) {
          // Code of Work

          // TODO: Confirmar endpint para editar y hacer una prueba
          // this.generalInformationService.(NEW_ALTERNATIVE).subscribe((res: any) => {
          //   this.ideaStore.dispatch(CLOSE_FULL_DRAWER())
          //   this.stepper.reset();
          // });
        }
        else {
          return;
        }
      });

      return
    }

    if (this.currentIdea.codigo) {
      const NEW_ALTERNATIVE: IdeaAlternative = {
        sectionBIId: this.currentIdea.codigo,
        preName: PRELIMINAR_NAME,
        resEntity: RESPONSIBLE_ENTITY,
        popDelimit: POPULATION_DELIMITATION,
        geoArea: GEOGRAPHIC_AREA,
        projDesc: PROJECT_DESCRIPTION
      }
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '250px',
        data: { title: 'Crear Alternativa', description: '¿Esta Seguro que desea guardar los datos de la Alternativa?', confirmation: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        if (result === true) {
          // Code of Work

          this.generalInformationService.sendAlternative(NEW_ALTERNATIVE).subscribe((res: any) => {
            this.ideaStore.dispatch(CLOSE_FULL_DRAWER())
            this.stepper.reset();
          });
        }
        else {
          return;
        }
      });
      return
    }

    // Esto aplica solo cuando se esta creado una idea con sus alternativas al mismo timepo
    const NEW_ALTERNATIVE: IdeaAlternative = {
      sectionBIId: '',
      preName: PRELIMINAR_NAME,
      resEntity: RESPONSIBLE_ENTITY,
      popDelimit: POPULATION_DELIMITATION,
      geoArea: GEOGRAPHIC_AREA,
      projDesc: PROJECT_DESCRIPTION
    }

    let alternatives = this.currentIdea.alternatives ? [...this.currentIdea.alternatives] : [];


    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '250px',
      data: { title: 'Crear Alternativa', description: '¿Esta Seguro que desea guardar los datos de la Alternativa?', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === true) {
        // Code of Work
        alternatives.push(NEW_ALTERNATIVE)
        console.log(alternatives);
        this.stepper.reset();

        this.ideaStore.dispatch(SET_IDEA_ALTERNATIVES({ alternatives }))
        this.alternativeStore.dispatch(DELETE_DATA_GEOS())
        this.ideaStore.dispatch(CLOSE_FULL_DRAWER2())

      }
      else {
        return;
      }
    });

  }

  calculaCobertura(): void {
    console.log(this.populationDelimitation.value.estimateBeneficiaries, this.populationDelimitation.value.totalPopulation)
    if (this.populationDelimitation.value.estimateBeneficiaries && this.populationDelimitation.value.totalPopulation) {
      let estBenefic = this.populationDelimitation.value.estimateBeneficiaries;
      let tpop = this.populationDelimitation.value.totalPopulation;

      let multCov = (estBenefic / tpop);
      let resCov = (multCov * 100);

      this.coverageText = resCov.toFixed(2);

    }
  }

}
