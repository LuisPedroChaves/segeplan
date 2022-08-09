import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';

import { CLOSE_FULL_DRAWER, OPEN_FULL_DRAWER } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-selected-idea',
  templateUrl: './selected-idea.component.html',
  styleUrls: ['./selected-idea.component.scss']
})
export class SelectedIdeaComponent implements OnInit, OnDestroy {

  ideaStoreSubscription = new Subscription();
  currentView = 'generalInformation';

  drawerSubscription = new Subscription();
  fullTitle = '';

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.ideaStore.select('drawer')
    .subscribe(state => {
      this.fullTitle = state.fullTitle
    });

  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe()
    this.ideaStoreSubscription?.unsubscribe()
  }

  closeFullDrawer(): void {
    this.ideaStore.dispatch(CLOSE_FULL_DRAWER())
  }

}
