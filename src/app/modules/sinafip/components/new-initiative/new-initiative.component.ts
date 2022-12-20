import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { AppState } from '../../../../store/app.reducer';
import { CalendarOptions } from '@fullcalendar/angular';
import { CLOSE_FORM_DRAWER, CLOSE_FULL_DRAWER, DELETE_ACTIVITIES, OPEN_FORM_DRAWER, READ_DENOMINATIONS, READ_ENTITIES, READ_GENERALSTUDIES, READ_GEOGRAFICOS, READ_MODALITYFINANCINGS, READ_PREINVDOCUMENTS, READ_PRODUCTS, READ_PROJECTFUNCTIONS, READ_REFERENCES, REMOVE_ACTIVITY } from 'src/app/store/actions';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DenominationStore, EntityStore, GeneralStudyStore, GeograficoStore, InitiativeStore, ModalityFinancingStore, PreinvDocumentStore, ProductStore, ProjectFunctionStore, ReferenceStore } from '../../../../store/reducers';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { SinafipService } from 'src/app/core/services/httpServices/sinafip.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Store } from '@ngrx/store';
import { UploadFileService } from 'src/app/core/services/httpServices/upload-file.service';
import { map, startWith } from 'rxjs/operators';
import { Entity, ProjectFunction, GeneralStudy, PreinvDocument, ModalityFinancing, Departament, ReferencePopulation, Denomination, IProduct, User, Activity, Institution, InvestmentProject, StudyDescription, Delimit, EstimatedBudget, RequiredDocument, IRequest } from '../../../../core/models';



@Component({
  selector: 'app-new-initiative',
  templateUrl: './new-initiative.component.html',
  styleUrls: ['./new-initiative.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class NewInitiativeComponent implements OnInit, OnDestroy {

  @ViewChild('formDrawer') formDrawer!: MatDrawer;
  @ViewChild('scrollMe') myScrollContainer: ElementRef;

  total = 0;

  drawerSubscription = new Subscription();
  fullTitle = '';
  formTitle = ''
  formComponent = '';

  // listados
  entities: Entity[] = [];
  entityStoreSubscription = new Subscription();

  projectFunctions: ProjectFunction[] = [];
  projectFunctionStoreSubscription = new Subscription();

  generalStudies: GeneralStudy[] = [];
  generalStudyStoreSubscription = new Subscription();

  preinvDocuments: PreinvDocument[] = [];
  preinvDocumentStoreSubscription = new Subscription();

  modalityFinancings: ModalityFinancing[] = [];
  modalityFinancingStoreSubscription = new Subscription();

  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();

  references: ReferencePopulation[] = [];
  referenceStoreSubscription = new Subscription();

  denominations: Denomination[] = [];
  denominationStoreSubscription = new Subscription();

  products: IProduct[] = [];
  filteredProducts: Observable<IProduct[]>;
  productStoreSubscription = new Subscription();

  // END LISTADOS

  institution = new FormGroup({
    entityName: new FormControl('', Validators.required),
    functionProjName: new FormControl('', Validators.required),
    generalStudy: new FormControl('', Validators.required),
    dcmntPreinvest: new FormControl('', Validators.required),
    documentProject: new FormControl(null, Validators.required),
    responsibleName: new FormControl('', Validators.required),
    contactEmail: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
  })

  investmentProject = new FormGroup({
    coreProblem: new FormControl('', Validators.required),
    _product: new FormControl<string | IProduct>('', Validators.required),
    nameProject: new FormControl('', Validators.required),
    objetiveProject: new FormControl('', Validators.required),
    descAdnJust: new FormControl('', Validators.required),
    infoStudies: new FormControl('', Validators.required),
    estimatedProject: new FormControl('', Validators.required),
  })

  studyDescription = new FormGroup({
    nameStudy: new FormControl('', Validators.required),
    objetiveGeneral: new FormControl('', Validators.required),
    costEstimted: new FormControl('', Validators.required),
    modalityFinancing: new FormControl('', Validators.required),
  })

  requiredDocument = new FormGroup({
    tdr: new FormControl(null, Validators.required),
    scheduleActiv: new FormControl(null, Validators.required),
    // totalStimated: new FormControl<number>(null, Validators.required),
  })

  delimit = new FormGroup({
    nameRefPop: new FormControl('', Validators.required),
    denomination: new FormControl('', Validators.required),
    estimatedBenef: new FormControl(null, [Validators.required, Validators.max(999999999999999)]),
    departament: new FormControl(''),
    municipality: new FormControl(''),
  })

  sessionSubscription: Subscription;
  usuario: User;

  activitiesStoreSubscription = new Subscription()
  activities: Activity[] = [];
  displayedColumns = ['activity', 'unitMeasure', 'cant', 'priceU', 'subTotal', 'actions'];
  dataSource = new MatTableDataSource<Activity>([])


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2022-11-01' },
      { title: 'event 2', date: '2022-11-02' }
    ],
    locale: 'es'
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  idEntidad = '';


  constructor(
    public initiativeStore: Store<InitiativeStore>,
    //LISTADOS
    private entityStore: Store<EntityStore>,
    private projectFunctionStore: Store<ProjectFunctionStore>,
    private generalStudyStore: Store<GeneralStudyStore>,
    private preinvDocumentStore: Store<PreinvDocumentStore>,
    private modalityFinancingStore: Store<ModalityFinancingStore>,
    private geograficoStore: Store<GeograficoStore>,
    private referenceStore: Store<ReferenceStore>,
    private denominationStore: Store<DenominationStore>,
    private productStore: Store<ProductStore>,
    public store: Store<AppState>,


    //END LISTADOS
    private sinafipService: SinafipService,
    private uploadService: UploadFileService,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.initiativeStore.select('drawer')
      .subscribe(state => {

        this.fullTitle = state.fullTitle
        if (this.formDrawer) {
          this.formDrawer.opened = state.formDrawer
          this.formComponent = state.formComponent
          this.formTitle = state.formTitle
        }

      });

    this.sessionSubscription = this.store.select('session').subscribe(session => {
      this.usuario = session.session.usuario;
      this.idEntidad = session.session.usuario.id_inst.toString()
    });

    this.activitiesStoreSubscription = this.initiativeStore.select('initiative')
      .subscribe(state => {
        this.ref.detectChanges()
        window.dispatchEvent(new Event('resize'));

        this.activities = state.activities
        this.dataSource = new MatTableDataSource<Activity>(this.activities)
        this.total = this.activities.map(item => item.subTotal).reduce((prev, curr) => prev + curr, 0);
      })

    //LISTADOS
    this.entityStoreSubscription = this.entityStore.select('entity')
      .subscribe(state => {
        this.entities = state.entities;
      })
    this.entityStore.dispatch(READ_ENTITIES())

    this.projectFunctionStoreSubscription = this.projectFunctionStore.select('projectFunction')
      .subscribe(state => {
        this.projectFunctions = state.projectFunctions;
      })
    this.projectFunctionStore.dispatch(READ_PROJECTFUNCTIONS())

    this.generalStudyStoreSubscription = this.generalStudyStore.select('generalStudy')
      .subscribe(state => {
        this.generalStudies = state.generalStudies;
      })
    this.generalStudyStore.dispatch(READ_GENERALSTUDIES())

    this.preinvDocumentStoreSubscription = this.preinvDocumentStore.select('preinvDocument')
      .subscribe(state => {
        this.preinvDocuments = state.preinvDocuments;
      })
    this.preinvDocumentStore.dispatch(READ_PREINVDOCUMENTS())

    this.modalityFinancingStoreSubscription = this.modalityFinancingStore.select('modalityFinancing')
      .subscribe(state => {
        this.modalityFinancings = state.modalityFinancings;
      })
    this.modalityFinancingStore.dispatch(READ_MODALITYFINANCINGS())

    this.departamentoStoreSubscription = this.geograficoStore.select('geografico')
      .subscribe(state => {
        this.departamentos = state.geograficos;
      })
    this.geograficoStore.dispatch(READ_GEOGRAFICOS());

    this.denominationStoreSubscription = this.denominationStore.select('denomination')
      .subscribe(state => {
        this.denominations = state.denominations;
      })
    this.denominationStore.dispatch(READ_DENOMINATIONS());

    this.referenceStoreSubscription = this.referenceStore.select('reference')
      .subscribe(state => {
        this.references = state.references;
      })
    this.referenceStore.dispatch(READ_REFERENCES())


    this.productStoreSubscription = this.productStore.select('product')
      .subscribe(state => {
        this.products = state.products;
      })

    this.productStore.dispatch(READ_PRODUCTS({ filtro: this.idEntidad }))

    this.filteredProducts = this.investmentProject.controls['_product'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const nombre = typeof value === 'string' ? value : value?.nombre;
        return nombre ? this._filter(nombre as string) : this.products;
      }),
    );
    // END LISTADOS

  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe();
    this.activitiesStoreSubscription?.unsubscribe()
    this.entityStoreSubscription.unsubscribe();
    this.projectFunctionStoreSubscription.unsubscribe();
    this.generalStudyStoreSubscription.unsubscribe();
    this.preinvDocumentStoreSubscription.unsubscribe();
    this.modalityFinancingStoreSubscription.unsubscribe();
    this.departamentoStoreSubscription.unsubscribe();
  }

  closeFullDrawer(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '375px',
      data: { title: 'Cambios no guardados', description: '¿Seguro que quiere salir? Hay cambios sin guardar. Si abandona la página, los cambios se perderán.', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.initiativeStore.dispatch(CLOSE_FULL_DRAWER())

      }

      return
    });
  }

  openFormDrawer(formTitle: string, formComponent: string): void {
    this.initiativeStore.dispatch(OPEN_FORM_DRAWER({ formTitle, formComponent }))
  }

  closeFormDrawer(): void {
    this.initiativeStore.dispatch(CLOSE_FORM_DRAWER())
  }

  removeActivity(activity: Activity): void {
    this.initiativeStore.dispatch(REMOVE_ACTIVITY({ activity }))
  }

  scrollToTop(): void {
    setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = 0;
    }, 500);
  }

  displayProduct(product: IProduct): string {
    return product ? product.nombre : '';
  }

  selecDepartament(): void {
    let dptoSelect = this.delimit.controls['departament'].value;
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto) { this.municipios = dpto.municipios }
  }

  private _filter(nombre: string): IProduct[] {
    const filterValue = nombre.toLowerCase();

    return this.products.filter(product => product.nombre.toLowerCase().includes(filterValue));
  }
  selectedProduct(): string {
    const PRODUCT = this.investmentProject.controls['_product'].value;
    return typeof PRODUCT === 'string' ? '' : PRODUCT?.nombre
  }

  saveInitiative(): void {

    const {
      entityName,
      functionProjName,
      generalStudy,
      dcmntPreinvest,
      documentProject,
      responsibleName,
      contactEmail,
      phoneNumber,
    } = this.institution.value

    const institution: Institution = {
      entityName,
      functionProjName,
      generalStudy,
      dcmntPreinvest,
      documentProject: '',
      responsibleName,
      contactEmail,
      phoneNumber,
    }

    const {
      _product,
      coreProblem,
      nameProject,
      objetiveProject,
      descAdnJust,
      infoStudies,
      estimatedProject,
    } = this.investmentProject.value

    const investment: InvestmentProject = {
      coreProblem,
      productId: typeof _product === 'string' ? null : _product?.codigo,
      productName: typeof _product === 'string' ? null : _product?.nombre,
      nameProject,
      objetiveProject,
      descAdnJust,
      infoStudies,
      estimatedProject,
    }

    const {
      nameStudy,
      objetiveGeneral,
      costEstimted,
      modalityFinancing,
    } = this.studyDescription.value

    const studyDescription: StudyDescription = {
      nameStudy,
      objetiveGeneral,
      costEstimted: parseInt(costEstimted),
      modalityFinancing,
    }

    const {
      nameRefPop,
      denomination,
      estimatedBenef,
      departament,
      municipality
    } = this.delimit.value

    const delimit: Delimit = {
      nameRefPop,
      denomination,
      estimatedBenef,
      departament,
      municipality
    }

    const {
      tdr,
      scheduleActiv,
      // totalStimated,
    } = this.requiredDocument.value

    const stimatedBudget: EstimatedBudget = {
      totalStimated: this.total,
      activities: this.activities
    }

    const requirementsDocuments: RequiredDocument = {
      tdr: '',
      scheduleActiv: '',
      stimatedBudget
    }

    const NEW_REQUEST: IRequest = {
      institution,
      investment,
      studyDescription,
      delimit,
      requirementsDocuments
    }

    this.sinafipService.createRequest(NEW_REQUEST)
      .subscribe(request => {

        if (documentProject && documentProject.files) {
          this.uploadService.uploadFile(documentProject.files[0], 'projectDocument', request.institution.id).then();
        }

        if (tdr && tdr.files) {
          this.uploadService.uploadFile(tdr.files[0], 'tdr', request.requirementsDocuments.id).then();
        }

        if (scheduleActiv && scheduleActiv.files) {
          this.uploadService.uploadFile(scheduleActiv.files[0], 'schedule', request.requirementsDocuments.id).then();
        }

        this.institution.reset()
        this.investmentProject.reset()
        this.studyDescription.reset()
        this.delimit.reset()
        this.requiredDocument.reset()

        this.initiativeStore.dispatch(DELETE_ACTIVITIES())
        this.initiativeStore.dispatch(CLOSE_FULL_DRAWER())

      })

  }

}
