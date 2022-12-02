import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CLOSE_FORM_DRAWER, CLOSE_FULL_DRAWER, CLOSE_FULL_DRAWER2 } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-selected-idea',
  templateUrl: './selected-idea.component.html',
  styleUrls: ['./selected-idea.component.scss']
})
export class SelectedIdeaComponent implements OnInit, OnDestroy {

  @ViewChild('fullDrawer2') fullDrawer2!: MatDrawer;
  @ViewChild('formDrawer') formDrawer!: MatDrawer;

  drawerSubscription = new Subscription();
  fullTitle = '';
  fullTitle2 = '';
  fullComponent2 = '';
  formTitle = ''
  formComponent = '';

  constructor(
    private ideaStore: Store<IdeaStore>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.ideaStore.select('drawer')
      .subscribe(state => {
        this.fullTitle = state.fullTitle

        if (this.fullDrawer2) {
          this.fullDrawer2.opened = state.fullDrawer2
        }
        this.fullTitle2 = state.fullTitle2
        this.fullComponent2 = state.fullComponent2

        if (this.formDrawer) {
          this.formDrawer.opened = state.formDrawer
          this.formComponent = state.formComponent
          this.formTitle = state.formTitle
        }
      });

  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe()
  }

  closeFullDrawer(): void {
    this.ideaStore.dispatch(CLOSE_FULL_DRAWER())
  }

  closeFullDrawer2(): void {

    setTimeout(() => {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '375px',
        data: { title: 'Cambios no guardados', description: '¿Seguro que quiere salir? Hay cambios sin guardar. Si abandona la página, los cambios se perderán.', confirmation: true }
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result === true) {

          this.ideaStore.dispatch(CLOSE_FULL_DRAWER2())

        }

        return
      });
    }, 100);
  }

  closeFormDrawer(): void {
    this.ideaStore.dispatch(CLOSE_FORM_DRAWER())
  }

}
