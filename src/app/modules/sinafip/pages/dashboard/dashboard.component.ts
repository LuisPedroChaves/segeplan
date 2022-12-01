import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as actions from 'src/app/store/actions'
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

   elevationNew = 'mat-elevation-z2'
   elevationNewIniciatives = 'mat-elevation-z2'
   elevationFollowups = 'mat-elevation-z2'
   elevationAdmissions = 'mat-elevation-z2'

  constructor(
    public store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  openFullDrawer(fullTitle: string, fullComponent: string): void {
    this.store.dispatch(actions.SET_IDEA({ idea: null }))
    this.store.dispatch(actions.OPEN_FULL_DRAWER({ fullTitle, fullComponent }))
  }

  closeDrawers(): void {
    this.store.dispatch( actions.CLOSE_FULL_DRAWER() )
    this.store.dispatch( actions.CLOSE_FULL_DRAWER2() )
  }

  newStyle($event): void{
    this.elevationNew = $event.type == 'mouseover' ? 'mat-elevation-z8' : 'mat-elevation-z2';
  }

  newIniciativeStyle($event): void{
    this.elevationNewIniciatives = $event.type == 'mouseover' ? 'mat-elevation-z8' : 'mat-elevation-z2';
  }

  followupStyle($event): void{
    this.elevationFollowups = $event.type == 'mouseover' ? 'mat-elevation-z8' : 'mat-elevation-z2';
  }

  admissionStyle($event): void{
    this.elevationAdmissions = $event.type == 'mouseover' ? 'mat-elevation-z8' : 'mat-elevation-z2';
  }


}
