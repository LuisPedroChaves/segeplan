import { Routes } from "@angular/router";

import { IndexComponent } from './pages/index/index.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectFinishComponent } from './pages/project-finish/project-finish.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { RoleGuard } from "src/app/core/auth/role.guard";

export const CheckProjectRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'projects',
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['USER_ROLE', 'ADMIN_ROLE']
        },
        component: ProjectListComponent
      },
      {
        path: 'projectFinish',
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['USER_ROLE', 'ADMIN_ROLE']
        },
        component: ProjectFinishComponent
      },
    ]
  }
];
