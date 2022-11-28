import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import {
  CHANGE_MENU_DRAWER,
  CLOSE_FULL_DRAWER,
  CLOSE_FULL_DRAWER2,
  OPEN_FULL_DRAWER
} from 'src/app/store/actions';
import { CheckProjectStore } from 'src/app/store/reducers/checkProject.reducer';
import { CHANGE_IS_MINISTRY } from '../../../../store/actions/checkProject.actions';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  @ViewChild('menuDrawer') menuDrawer!: MatDrawer;
  @ViewChild('fullDrawer') fullDrawer!: MatDrawer;

  drawerSubscription = new Subscription;

  checkProjectSubscription = new Subscription

  sessionSubscription: Subscription;

  fullComponent = '';

  isMinistry = false

  constructor(
    public checkProjectStore: Store<CheckProjectStore>,
  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.checkProjectStore.select('drawer')
      .subscribe(state => {
        if (this.menuDrawer) {
          this.menuDrawer.opened = state.menuDrawer;
        }
        if (this.fullDrawer) {
          this.fullDrawer.opened = state.fullDrawer;
          this.fullComponent = state.fullComponent
        }
      });

      this.checkProjectSubscription = this.checkProjectStore.select('checkProject')
        .subscribe(state => {

          this.isMinistry = state.isMinistry

        })
  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe();
    this.checkProjectSubscription?.unsubscribe();
  }


  chengeDrawer(): void {
    this.checkProjectStore.dispatch(CHANGE_MENU_DRAWER())
  }

  openFullDrawer(fullTitle: string, fullComponent: string): void {
    this.checkProjectStore.dispatch(OPEN_FULL_DRAWER({ fullTitle, fullComponent }))
  }

  closeDrawers(): void {
    this.checkProjectStore.dispatch(CLOSE_FULL_DRAWER())
    this.checkProjectStore.dispatch(CLOSE_FULL_DRAWER2())
  }

  checkIsMinistry(isMinistry: boolean): void {
    this.checkProjectStore.dispatch( CHANGE_IS_MINISTRY({ isMinistry }) )
  }

}
