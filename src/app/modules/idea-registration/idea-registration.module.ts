import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from 'src/app/shared/shared.module';
import { IdeaReducer, ProductReducer } from 'src/app/store/reducers';
import { IdeaEffects } from 'src/app/store/effects/idea.effects';
import { IndexComponent } from './pages/index/index.component';
import { IdeaRegistrationRoutes } from './idea-registration.routing';
import { NewIdeasComponent } from './pages/new-ideas/new-ideas.component';
import { FollowIdeasComponent } from './pages/follow-ideas/follow-ideas.component';
import { HistoryIdeasComponent } from './pages/history-ideas/history-ideas.component';
import { NewIdeaComponent } from './components/new-idea/new-idea.component';
import { SelectedIdeaComponent } from './components/selected-idea/selected-idea.component';



@NgModule({
  declarations: [
    IndexComponent,
    NewIdeasComponent,
    FollowIdeasComponent,
    HistoryIdeasComponent,
    NewIdeaComponent,
    SelectedIdeaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(IdeaRegistrationRoutes),
    SharedModule,
    StoreModule.forFeature('product', ProductReducer),
    StoreModule.forFeature('idea', IdeaReducer),
    EffectsModule.forFeature([IdeaEffects]),
  ]
})
export class IdeaRegistrationModule { }
