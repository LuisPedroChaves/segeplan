import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { DashboardRoutes } from './dashboard.routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    SharedModule
  ]
})
export class DashboardModule { }
