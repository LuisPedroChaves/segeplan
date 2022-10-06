import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CLOSE_FULL_DRAWER, DELETE_ACTIVITIES, OPEN_FORM_DRAWER, READ_MODALITYFINANCINGS, READ_PREINVDOCUMENTS, REMOVE_ACTIVITY } from 'src/app/store/actions';
import { Entity } from '../../../../core/models/sinafip/entity';
import { EntityStore, ModalityFinancingStore, PreinvDocumentStore, ProjectFunctionStore } from '../../../../store/reducers';
import { READ_ENTITIES } from '../../../../store/actions/entity.actions';
import { ProjectFunction } from '../../../../core/models/sinafip/projectFunction';
import { GeneralStudy } from '../../../../core/models/sinafip/generalStudy';
import { PreinvDocument } from '../../../../core/models/sinafip/preinvDocument';
import { ModalityFinancing } from '../../../../core/models/sinafip/modalityFinancing';
import { GeneralStudyStore } from '../../../../store/reducers/generalStudy.reducer';
import { READ_PROJECTFUNCTIONS } from '../../../../store/actions/projectFunction.action';
import { READ_GENERALSTUDIES } from '../../../../store/actions/generalStudy.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Activity } from 'src/app/core/models/sinafip/activity';
import { InitiativeStore } from '../../../../store/reducers/initiative.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { MatDrawer } from '@angular/material/sidenav';
import { CLOSE_FORM_DRAWER } from '../../../../store/actions/drawer.actions';
import { IRequest } from 'src/app/core/models/sinafip/request';
import { Institution } from '../../../../core/models/sinafip/institution';
import { InvestmentProject } from 'src/app/core/models/sinafip/investmentProject';
import { StudyDescription } from 'src/app/core/models/sinafip/studyDescription';
import { Delimit } from 'src/app/core/models/sinafip/delimit';
import { RequiredDocument } from 'src/app/core/models/sinafip/requiredDocument';
import { EstimatedBudget } from 'src/app/core/models/sinafip/estimatedBudget';
import { SinafipService } from 'src/app/core/services/httpServices/sinafip.service';
import { UploadFileService } from 'src/app/core/services/httpServices/upload-file.service';

@Component({
  selector: 'app-new-initiative',
  templateUrl: './new-initiative.component.html',
  styleUrls: ['./new-initiative.component.scss']
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
  })

  activitiesStoreSubscription = new Subscription()
  activities: Activity[] = [];
  displayedColumns = ['activity', 'unitMeasure', 'cant', 'priceU', 'subTotal', 'actions'];
  dataSource = new MatTableDataSource<Activity>([])

  constructor(
    public initiativeStore: Store<InitiativeStore>,
    //LISTADOS
    private entityStore: Store<EntityStore>,
    private projectFunctionStore: Store<ProjectFunctionStore>,
    private generalStudyStore: Store<GeneralStudyStore>,
    private preinvDocumentStore: Store<PreinvDocumentStore>,
    private modalityFinancingStore: Store<ModalityFinancingStore>,
    //END LISTADOS
    private sinafipService: SinafipService,
    private uploadService: UploadFileService
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

    this.activitiesStoreSubscription = this.initiativeStore.select('initiative')
      .subscribe(state => {
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

    // END LISTADOS

  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe();
    this.activitiesStoreSubscription?.unsubscribe()
  }

  closeFullDrawer(): void {
    this.initiativeStore.dispatch(CLOSE_FULL_DRAWER())
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
      nameProject,
      objetiveProject,
      descAdnJust,
      infoStudies,
      estimatedProject,
    } = this.investmentProject.value

    const investment: InvestmentProject = {
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
    } = this.delimit.value

    const delimit: Delimit = {
      nameRefPop,
      denomination,
      estimatedBenef,
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

        this.initiativeStore.dispatch( DELETE_ACTIVITIES() )
        this.initiativeStore.dispatch( CLOSE_FULL_DRAWER() )

      })

  }

}
