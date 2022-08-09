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
import { NewIdeaComponent } from './components/new-idea/new-idea.component';
import { SelectedIdeaComponent } from './components/selected-idea/selected-idea.component';
import { RevelanceMatrixComponent } from './pages/revelance-matrix/revelance-matrix.component';
import { IdeaCardComponent } from './components/idea-card/idea-card.component';
import { AlternativesComponent } from './components/alternatives/alternatives.component';
import { NewAlternativeComponent } from './components/new-alternative/new-alternative.component';



@NgModule({
  declarations: [
    IndexComponent,
    NewIdeasComponent,
    NewIdeaComponent,
    SelectedIdeaComponent,
    RevelanceMatrixComponent,
    IdeaCardComponent,
    AlternativesComponent,
    NewAlternativeComponent,
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
