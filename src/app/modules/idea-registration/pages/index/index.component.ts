import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/store/app.reducer';
import { User } from '../../../../core/models/adicionales/user';
import * as actions from '../../../../store/actions'
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { CLOSE_FULL_DRAWER } from '../../../../store/actions';

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
    private dialog: MatDialog
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
    this.store.dispatch(actions.SET_IDEA({ idea: null }))
    this.store.dispatch(actions.OPEN_FULL_DRAWER({ fullTitle, fullComponent }))
  }

  closeFullDrawer(): void {
    setTimeout(() => {

      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '375px',
        data: { title: 'Cambios no guardados', description: '¿Seguro que quiere salir? Hay cambios sin guardar. Si abandona la página, los cambios se perderán.', confirmation: true }
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result === true) {

          this.store.dispatch(CLOSE_FULL_DRAWER())

        }

        return
      });

    }, 100);
  }

  closeDrawers(): void {
    this.store.dispatch(actions.CLOSE_FULL_DRAWER())
    this.store.dispatch(actions.CLOSE_FULL_DRAWER2())
  }

}
