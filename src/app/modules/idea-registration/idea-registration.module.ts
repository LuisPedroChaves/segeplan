import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from 'src/app/shared/shared.module';
import { IdeaReducer, ProductReducer, DenominationReducer } from 'src/app/store/reducers';
import { IdeaEffects } from 'src/app/store/effects/idea.effects';
import { IndexComponent } from './pages/index/index.component';
import { IdeaRegistrationRoutes } from './idea-registration.routing';
import { NewIdeasComponent } from './pages/new-ideas/new-ideas.component';
import { NewIdeaComponent } from './components/new-idea/new-idea.component';
import { SelectedIdeaComponent } from './components/selected-idea/selected-idea.component';
import { RevelanceMatrixComponent } from './pages/revelance-matrix/revelance-matrix.component';
import { IdeaCardComponent } from './components/idea-card/idea-card.component';
import { NewAlternativeComponent } from './components/new-alternative/new-alternative.component';
import { SendIdeasComponent } from './pages/send-ideas/send-ideas.component';
import { DoneIdeasComponent } from './pages/done-ideas/done-ideas.component';
import { IdeaCardMiniComponent } from './components/idea-card-mini/idea-card-mini.component';
import { NewRevelanceMatrixComponent } from './components/new-revelance-matrix/new-revelance-matrix.component';
import { GeograficoReducer } from '../../store/reducers/geografico.reducer';
import { ObjectReducer } from '../../store/reducers/object.reducer';
import { ProcesoReducer } from '../../store/reducers/proceso.reducer';
import { ReferenceReducer } from '../../store/reducers/popRef.reducer';
import { AlternativeReducer } from '../../store/reducers/alternative.reducer';
import { SelectedAlternativeComponent } from './components/selected-alternative/selected-alternative.component';
import { NewDataGeoComponent } from './components/new-data-geo/new-data-geo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';



@NgModule({
  declarations: [
    DoneIdeasComponent,
    IdeaCardComponent,
    IdeaCardMiniComponent,
    IndexComponent,
    NewAlternativeComponent,
    NewIdeaComponent,
    NewIdeasComponent,
    NewRevelanceMatrixComponent,
    RevelanceMatrixComponent,
    SelectedAlternativeComponent,
    SelectedIdeaComponent,
    SendIdeasComponent,
    NewDataGeoComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(IdeaRegistrationRoutes),
    SharedModule,
    StoreModule.forFeature('alternative', AlternativeReducer),
    StoreModule.forFeature('reference', ReferenceReducer),
    StoreModule.forFeature('denomination', DenominationReducer),
    StoreModule.forFeature('geografico', GeograficoReducer),
    StoreModule.forFeature('object', ObjectReducer),
    StoreModule.forFeature('proceso', ProcesoReducer),
    StoreModule.forFeature('product', ProductReducer),
    StoreModule.forFeature('idea', IdeaReducer),
    EffectsModule.forFeature([IdeaEffects]),
  ]
})
export class IdeaRegistrationModule { }
