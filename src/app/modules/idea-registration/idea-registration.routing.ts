import { Routes } from "@angular/router";

import { IndexComponent } from './pages/index/index.component';
import { NewIdeasComponent } from "./pages/new-ideas/new-ideas.component";
import { RevelanceMatrixComponent } from './pages/revelance-matrix/revelance-matrix.component';
import { SendIdeasComponent } from './pages/send-ideas/send-ideas.component';
import { DoneIdeasComponent } from './pages/done-ideas/done-ideas.component';

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
        path: 'sendIdeas',
        component: SendIdeasComponent
      },
      {
        path: 'doneIdeas',
        component: DoneIdeasComponent
      },
      {
        path: 'revelanceMatrix',
        component: RevelanceMatrixComponent
      },
    ]
  }
];
