import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CLOSE_FULL_DRAWER } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-admition-matrix',
  templateUrl: './admition-matrix.component.html',
  styleUrls: ['./admition-matrix.component.scss']
})
export class AdmitionMatrixComponent implements OnInit, OnDestroy {

  drawerSubscription = new Subscription();
  fullTitle = '';

  constructor(
    private appStore: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe()
}

closeFullDrawer(): void {
  this.appStore.dispatch(CLOSE_FULL_DRAWER())
}

}
