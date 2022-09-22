import { Routes } from "@angular/router";
import { IndexComponent } from './pages/index/index.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../modules/idea-registration/idea-registration.module').then(
            (m) => m.IdeaRegistrationModule
          ),
      },
      {
        path: 'sinafip',
        loadChildren: () =>
          import('../../modules/sinafip/sinafip.module').then(
            (m) => m.SinafipModule
          ),
      },
    ]
  }
];
