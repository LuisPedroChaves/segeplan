import { Routes } from "@angular/router";

import { IndexComponent } from './pages/index/index.component';
import { NewIdeasComponent } from "./pages/new-ideas/new-ideas.component";
import { RevelanceMatrixComponent } from './pages/revelance-matrix/revelance-matrix.component';
import { SendIdeasComponent } from './pages/send-ideas/send-ideas.component';
import { DoneIdeasComponent } from './pages/done-ideas/done-ideas.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { RoleGuard } from "src/app/core/auth/role.guard";

export const IdeaRegistrationRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'newIdeas',
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE']
        },
        component: NewIdeasComponent,
      },
      {
        path: 'sendIdeas',
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE']
        },
        component: SendIdeasComponent
      },
      {
        path: 'doneIdeas',
        component: DoneIdeasComponent
      },
      {
        path: 'revelanceMatrix',
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['ADMIN_ROLE']
        },
        component: RevelanceMatrixComponent
      },
    ]
  }
];
