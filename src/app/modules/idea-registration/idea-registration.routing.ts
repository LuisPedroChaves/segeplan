import { Routes } from "@angular/router";

import { IndexComponent } from './pages/index/index.component';
import { NewIdeasComponent } from "./pages/new-ideas/new-ideas.component";
import { RevelanceMatrixComponent } from './pages/revelance-matrix/revelance-matrix.component';

export const IdeaRegistrationRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: NewIdeasComponent,
      },
      {
        path: 'revelanceMatrix',
        component: RevelanceMatrixComponent
      },
    ]
  }
];
