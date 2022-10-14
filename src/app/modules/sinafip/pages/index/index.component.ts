import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CHANGE_MENU_DRAWER, CLOSE_FULL_DRAWER, CLOSE_FULL_DRAWER2, OPEN_FULL_DRAWER, SET_IDEA } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';
import { User } from '../../../../core/models/adicionales/user';

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

  sessionSubscription: Subscription;
  usuario: User;

  constructor(
    public store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.sessionSubscription = this.store.select('session').subscribe(session => {
      this.usuario = session.session.usuario;
    });
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
    this.store.dispatch(CHANGE_MENU_DRAWER())
  }

  openFullDrawer(fullTitle: string, fullComponent: string): void {
    // this.store.dispatch(SET_IDEA({idea: null})) TODO: Enlazar con iniciativas de pre inversion
    this.store.dispatch(OPEN_FULL_DRAWER({fullTitle, fullComponent}))
  }

  closeDrawers(): void {
    this.store.dispatch( CLOSE_FULL_DRAWER() )
    this.store.dispatch( CLOSE_FULL_DRAWER2() )
  }

}
