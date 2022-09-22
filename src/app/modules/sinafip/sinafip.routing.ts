import { Routes } from "@angular/router";

import { IndexComponent } from './pages/index/index.component';
import { NewIniciativesComponent } from './pages/new-iniciatives/new-iniciatives.component';

export const SinafipRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: NewIniciativesComponent,
      },
    ]
  }
];
