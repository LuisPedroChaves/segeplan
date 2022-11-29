import { Routes } from "@angular/router";

import { IndexComponent } from './pages/index/index.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectFinishComponent } from './pages/project-finish/project-finish.component';

export const CheckProjectRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: ProjectListComponent
      },
      {
        path: 'projectFinish',
        component: ProjectFinishComponent
      },
    ]
  }
];
