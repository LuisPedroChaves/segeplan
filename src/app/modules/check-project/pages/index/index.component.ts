import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';

import * as actions from 'src/app/store/actions';
import { CLOSE_FULL_DRAWER } from 'src/app/store/actions';
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
    private dialog: MatDialog,
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
    this.checkProjectStore.dispatch(actions.CHANGE_MENU_DRAWER())
  }

  openFullDrawer(fullTitle: string, fullComponent: string): void {
    this.checkProjectStore.dispatch(actions.SET_PROJECT({ checkProject: null }))
    this.checkProjectStore.dispatch(actions.OPEN_FULL_DRAWER({ fullTitle, fullComponent }))
    this.checkProjectStore.dispatch(actions.CLOSE_FORM_DRAWER())
  }

  closeDrawers(): void {
    this.checkProjectStore.dispatch(actions.CLOSE_FULL_DRAWER())
    this.checkProjectStore.dispatch(actions.CLOSE_FULL_DRAWER2())
  }

  closeFullDrawer(): void {

    setTimeout(() => {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '375px',
        data: { title: 'Cambios no guardados', description: '¿Seguro que quiere salir? Hay cambios sin guardar. Si abandona la página, los cambios se perderán.', confirmation: true }
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result === true) {

          this.checkProjectStore.dispatch(CLOSE_FULL_DRAWER())

        }

        return
      });

    }, 100);

  }

  checkIsMinistry(isMinistry: boolean): void {
    this.checkProjectStore.dispatch(CHANGE_IS_MINISTRY({ isMinistry }))
  }

}
