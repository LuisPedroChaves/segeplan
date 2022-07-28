import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './pages/index/index.component';
import { IdeaRegistrationRoutes } from './idea-registration.routing';
import { NewIdeasComponent } from './pages/new-ideas/new-ideas.component';
import { FollowIdeasComponent } from './pages/follow-ideas/follow-ideas.component';
import { HistoryIdeasComponent } from './pages/history-ideas/history-ideas.component';



@NgModule({
  declarations: [
    IndexComponent,
    NewIdeasComponent,
    FollowIdeasComponent,
    HistoryIdeasComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(IdeaRegistrationRoutes),
    SharedModule
  ]
})
export class IdeaRegistrationModule { }
