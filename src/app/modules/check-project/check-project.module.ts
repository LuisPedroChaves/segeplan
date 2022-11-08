import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { CheckProjectRoutes } from './check-project.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { NewTrackComponent } from './components/new-track/new-track.component';



@NgModule({
  declarations: [
    IndexComponent,
    NewProjectComponent,
    ProjectListComponent,
    NewTrackComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CheckProjectRoutes),
    SharedModule,
  ]
})
export class CheckProjectModule { }
