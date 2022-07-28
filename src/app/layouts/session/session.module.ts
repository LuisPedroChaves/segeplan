import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SessionRoutes } from './session.routing';
import { IndexComponent } from './pages/index/index.component';



@NgModule({
  declarations: [
    LoginComponent,
    NotFoundComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SessionRoutes),
    SharedModule
  ]
})
export class SessionModule { }
