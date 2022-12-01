import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './pages/index/index.component';
import { SinafipRoutes } from './sinafip.routing';
import { NewInitiativeComponent } from './components/new-initiative/new-initiative.component';
import { NewIniciativesComponent } from './pages/new-iniciatives/new-iniciatives.component';
import { StoreModule } from '@ngrx/store';
import { EntityReducer, ProjectFunctionReducer } from '../../store/reducers';
import { GeneralStudyReducer } from '../../store/reducers/generalStudy.reducer';
import { PreinvDocumentReducer } from '../../store/reducers/preinvDocument.reducer';
import { ModalityFinancingReducer } from '../../store/reducers/modalityFinancing.reducer';
import { SelectedInitiativeComponent } from './components/selected-initiative/selected-initiative.component';
import { InitiativeCardComponent } from './components/initiative-card/initiative-card.component';
import { InitiativeReducer } from '../../store/reducers/initiative.reducer';
import { NewActivityComponent } from './components/new-activity/new-activity.component';
import { AdmitionMatrixComponent } from './components/admition-matrix/admition-matrix.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FollowupsComponent } from './pages/followups/followups.component';
import { AdmissionsComponent } from './pages/admissions/admissions.component';



@NgModule({
  declarations: [
    IndexComponent,
    NewInitiativeComponent,
    NewIniciativesComponent,
    SelectedInitiativeComponent,
    InitiativeCardComponent,
    NewActivityComponent,
    AdmitionMatrixComponent,
    DashboardComponent,
    FollowupsComponent,
    AdmissionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SinafipRoutes),
    SharedModule,
    StoreModule.forFeature('initiative', InitiativeReducer),
    StoreModule.forFeature('entity', EntityReducer),
    StoreModule.forFeature('projectFunction', ProjectFunctionReducer),
    StoreModule.forFeature('generalStudy', GeneralStudyReducer),
    StoreModule.forFeature('preinvDocument', PreinvDocumentReducer),
    StoreModule.forFeature('modalityFinancing', ModalityFinancingReducer),

  ]
})
export class SinafipModule { }
