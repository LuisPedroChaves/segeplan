import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { ISession } from './core/models/adicionales/session.model';
import { AppState } from './store/app.reducer';
import { LOGOUT, SET_SESSION } from './store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {


  @HostBinding('class') className = ''
  theme = 'lightMode'

  sessionSubscription: Subscription;
  session: ISession = null;

  constructor(
    private overlay: OverlayContainer,
    public store: Store<AppState>,
    public router: Router,
  ) {

    if (localStorage.getItem('segeplan-session') !== null) {
      const session = JSON.parse(localStorage.getItem('segeplan-session'));
      this.store.dispatch(SET_SESSION({session}));
    }

  }

  ngOnInit(): void {
    if (localStorage.getItem('theme')) {
      this.theme = localStorage.getItem('theme')!
      this.setThemeClass()
    }

    this.sessionSubscription = this.store.select('session').subscribe(session => {
      this.session = session.session;

      if (!this.session) {
        this.router.navigate(['session']);
      }
    });
  }

  ngOnDestroy() {
    this.sessionSubscription?.unsubscribe();
  }

  changeMode() {
    this.theme = (this.theme === 'lightMode') ? 'darkMode' : 'lightMode'
    this.setThemeClass()

    localStorage.setItem('theme', this.theme)
  }

  setThemeClass() {
    if (this.theme === 'lightMode') {
      this.className = '';
      this.overlay.getContainerElement().classList.remove('darkMode');
      return
    }

    this.className = 'darkMode'
    this.overlay.getContainerElement().classList.add(this.className);
  }

  logout(): void {
    localStorage.removeItem('segeplan-session');
    this.store.dispatch(LOGOUT());
  }

}
