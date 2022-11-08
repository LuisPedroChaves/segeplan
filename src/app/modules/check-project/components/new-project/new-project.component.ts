import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CLOSE_FULL_DRAWER } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit, OnDestroy {

  @ViewChild('formDrawer') formDrawer!: MatDrawer;

  drawerSubscription = new Subscription();
  fullTitle = '';
  formTitle = ''
  formComponent = '';

  constructor(
    public store: Store<AppState>,
  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.store.select('drawer')
    .subscribe(state => {

      this.fullTitle = state.fullTitle
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
    this.store.dispatch(CLOSE_FULL_DRAWER())
  }

}
