import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CLOSE_FULL_DRAWER } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-new-initiative',
  templateUrl: './new-initiative.component.html',
  styleUrls: ['./new-initiative.component.scss']
})
export class NewInitiativeComponent implements OnInit, OnDestroy {

  drawerSubscription = new Subscription();
  fullTitle = '';

  constructor(
    public store: Store<AppState>,
  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.store.select('drawer')
    .subscribe(state => {
      this.fullTitle = state.fullTitle
    });

  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe();
  }

  closeFullDrawer(): void {
    this.store.dispatch(CLOSE_FULL_DRAWER())
  }


}
