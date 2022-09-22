import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './pages/index/index.component';
import { SinafipRoutes } from './sinafip.routing';
import { NewInitiativeComponent } from './components/new-initiative/new-initiative.component';



@NgModule({
  declarations: [
    IndexComponent,
    NewInitiativeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SinafipRoutes),
    SharedModule
  ]
})
export class SinafipModule { }
