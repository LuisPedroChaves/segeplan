import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CLOSE_FULL_DRAWER, READ_MODALITYFINANCINGS, READ_PREINVDOCUMENTS } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';
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

@Component({
  selector: 'app-new-initiative',
  templateUrl: './new-initiative.component.html',
  styleUrls: ['./new-initiative.component.scss']
})
export class NewInitiativeComponent implements OnInit, OnDestroy {

  drawerSubscription = new Subscription();
  fullTitle = '';

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
  })

  constructor(
    public store: Store<AppState>,
    //LISTADOS
    private entityStore: Store<EntityStore>,
    private projectFunctionStore: Store<ProjectFunctionStore>,
    private generalStudyStore: Store<GeneralStudyStore>,
    private preinvDocumentStore: Store<PreinvDocumentStore>,
    private modalityFinancingStore: Store<ModalityFinancingStore>,
    //END LISTADOS
  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.store.select('drawer')
      .subscribe(state => {
        this.fullTitle = state.fullTitle
      });

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
  }

  closeFullDrawer(): void {
    this.store.dispatch(CLOSE_FULL_DRAWER())
  }


}
