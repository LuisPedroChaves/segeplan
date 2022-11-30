import { Routes } from "@angular/router";
import { RoleGuard } from "src/app/core/auth/role.guard";
import { IndexComponent } from './pages/index/index.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'ideas',
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE']
        },
        loadChildren: () =>
          import('../../modules/idea-registration/idea-registration.module').then(
            (m) => m.IdeaRegistrationModule
          ),
      },
      {
        path: 'sinafip',
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['ADMIN_ROLE', 'DIGITADOR_ROLE']
        },
        loadChildren: () =>
          import('../../modules/sinafip/sinafip.module').then(
            (m) => m.SinafipModule
          ),
      },
      {
        path: 'checkProject',
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['ADMIN_ROLE', 'DIGITADOR_ROLE']
        },
        loadChildren: () =>
          import('../../modules/check-project/check-project.module').then(
            (m) => m.CheckProjectModule
          ),
      },
    ]
  }
];
