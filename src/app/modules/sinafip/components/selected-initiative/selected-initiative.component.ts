import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CLOSE_FULL_DRAWER } from 'src/app/store/actions';

import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-selected-initiative',
  templateUrl: './selected-initiative.component.html',
  styleUrls: ['./selected-initiative.component.scss']
})
export class SelectedInitiativeComponent implements OnInit, OnDestroy {

  drawerSubscription = new Subscription();
  fullTitle = '';

  constructor(
    private appStore: Store<AppState>,
  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.appStore.select('drawer')
    .subscribe(state => {
      this.fullTitle = state.fullTitle
    });

  }

  ngOnDestroy(): void {
      this.drawerSubscription?.unsubscribe()
  }

  closeFullDrawer(): void {
    this.appStore.dispatch(CLOSE_FULL_DRAWER())
  }

}
