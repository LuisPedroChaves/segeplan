import { Routes } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { LoginComponent } from "./pages/login/login.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const SessionRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      },
    ]
  }
];
