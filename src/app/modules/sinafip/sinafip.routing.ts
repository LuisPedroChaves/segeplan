import { Routes } from "@angular/router";

import { IndexComponent } from './pages/index/index.component';

export const SinafipRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      // {
      //   path: '',
      //   component: NewIdeasComponent,
      // },
    ]
  }
];
