import { Routes } from "@angular/router";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NewIniciativesComponent } from './pages/new-iniciatives/new-iniciatives.component';
import { IndexComponent } from './pages/index/index.component';
import { FollowupsComponent } from "./pages/followups/followups.component";
import { AdmissionsComponent } from "./pages/admissions/admissions.component";
import { RoleGuard } from "src/app/core/auth/role.guard";

export const SinafipRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'newIniciatives',
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['USER_ROLE', 'ADMIN_ROLE']
        },
        component: NewIniciativesComponent,
      },
      {
        path: 'followups',
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['USER_ROLE', 'ADMIN_ROLE']
        },
        component: FollowupsComponent,
      },
      {
        path: 'admissions',
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['ADMIN_ROLE']
        },
        component: AdmissionsComponent,
      },
    ]
  }
];
