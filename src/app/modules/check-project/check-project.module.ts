import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from 'src/app/shared/shared.module';
import { EntityReducer } from 'src/app/store/reducers';
import { CheckProjectReducer } from 'src/app/store/reducers/checkProject.reducer';
import { IndexComponent } from './pages/index/index.component';
import { CheckProjectRoutes } from './check-project.routing';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { NewTrackComponent } from './components/new-track/new-track.component';
import { ProjectFinishComponent } from './pages/project-finish/project-finish.component';



@NgModule({
  declarations: [
    IndexComponent,
    NewProjectComponent,
    ProjectListComponent,
    NewTrackComponent,
    ProjectFinishComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CheckProjectRoutes),
    SharedModule,
    StoreModule.forFeature('entity', EntityReducer),
    StoreModule.forFeature('checkProject', CheckProjectReducer),
  ]
})
export class CheckProjectModule { }
