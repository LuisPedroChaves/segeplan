import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';

import { CLOSE_FULL_DRAWER, CLOSE_FULL_DRAWER2, OPEN_FULL_DRAWER } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-selected-idea',
  templateUrl: './selected-idea.component.html',
  styleUrls: ['./selected-idea.component.scss']
})
export class SelectedIdeaComponent implements OnInit, OnDestroy {

  @ViewChild('fullDrawer2') fullDrawer2!: MatDrawer;

  ideaStoreSubscription = new Subscription();
  currentView = 'generalInformation';

  drawerSubscription = new Subscription();
  fullTitle = '';
  fullTitle2 = '';
  fullComponent2 = '';

  constructor(
    private ideaStore: Store<IdeaStore>,
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
    });

  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe()
    this.ideaStoreSubscription?.unsubscribe()
  }

  closeFullDrawer(): void {
    this.ideaStore.dispatch(CLOSE_FULL_DRAWER())
  }

  closeFullDrawer2(): void {
    this.ideaStore.dispatch(CLOSE_FULL_DRAWER2())
  }

}
