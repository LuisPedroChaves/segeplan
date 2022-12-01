import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/store/app.reducer';
import { User } from '../../../../core/models/adicionales/user';
import * as actions from '../../../../store/actions'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  @ViewChild('menuDrawer') menuDrawer!: MatDrawer;
  @ViewChild('fullDrawer') fullDrawer!: MatDrawer;

  storeSubscription = new Subscription;
  fullComponent = '';

  constructor(
    public store: Store<AppState>,
  ) { }

  ngOnInit(): void {

    this.storeSubscription = this.store.select('drawer')
      .subscribe(state => {
        if (this.menuDrawer) {
          this.menuDrawer.opened = state.menuDrawer;
        }
        if (this.fullDrawer) {
          this.fullDrawer.opened = state.fullDrawer;
          this.fullComponent = state.fullComponent
        }
      });

  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
  }

  chengeDrawer(): void {
    this.store.dispatch(actions.CHANGE_MENU_DRAWER())
  }

  openFullDrawer(fullTitle: string, fullComponent: string): void {
    this.store.dispatch(actions.SET_IDEA({idea: null}))
    this.store.dispatch(actions.OPEN_FULL_DRAWER({fullTitle, fullComponent}))
  }

  closeDrawers(): void {
    this.store.dispatch( actions.CLOSE_FULL_DRAWER() )
    this.store.dispatch( actions.CLOSE_FULL_DRAWER2() )
  }

}
