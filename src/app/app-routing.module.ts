import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeModule } from './layouts/home/home.module';

const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
    ],
  },
  {
    path: 'session',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/session/session.module').then(
            (m) => m.SessionModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'session/not-found',
  },
]


@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
