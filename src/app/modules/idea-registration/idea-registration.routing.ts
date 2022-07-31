import { Routes } from "@angular/router";

import { IndexComponent } from './pages/index/index.component';
import { NewIdeasComponent } from "./pages/new-ideas/new-ideas.component";
import { FollowIdeasComponent } from './pages/follow-ideas/follow-ideas.component';
import { HistoryIdeasComponent } from './pages/history-ideas/history-ideas.component';

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
        path: 'followIdeas',
        component: FollowIdeasComponent
      },
      {
        path: 'historyIdeas',
        component: HistoryIdeasComponent
      },
    ]
  }
];
