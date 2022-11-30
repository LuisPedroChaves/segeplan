import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.reducer';
import { ISession } from 'src/app/core/models/adicionales/session.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  sessionSubscription = new Subscription()
  session: ISession = null;

  elevationIdeas = 'mat-elevation-z2'
  elevationSinafip = 'mat-elevation-z2'
  elevationProjects = 'mat-elevation-z2'

  constructor(
    private appStore: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.sessionSubscription = this.appStore.select('session')
      .subscribe(state => {
        if (state.session) {
          this.session = state.session
        }
      })

  }

  ngOnDestroy(): void {
      this.sessionSubscription?.unsubscribe()
  }

  ideaStyle($event): void{

    this.elevationIdeas = $event.type == 'mouseover' ? 'mat-elevation-z16' : 'mat-elevation-z0';
  }

  sinafipStyle($event): void{

    this.elevationSinafip = $event.type == 'mouseover' ? 'mat-elevation-z16' : 'mat-elevation-z0';
  }

  projectStyle($event): void{

    this.elevationProjects = $event.type == 'mouseover' ? 'mat-elevation-z16' : 'mat-elevation-z0';
  }

}
