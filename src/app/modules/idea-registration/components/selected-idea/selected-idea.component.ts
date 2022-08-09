import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';

import { OPEN_FULL_DRAWER } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-selected-idea',
  templateUrl: './selected-idea.component.html',
  styleUrls: ['./selected-idea.component.scss']
})
export class SelectedIdeaComponent implements OnInit, OnDestroy {

  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {
    this.ideaStoreSubscription =  this.ideaStore.select('idea')
    .subscribe(state => {
      this.currentIdea = state.idea;
    })
  }

  ngOnDestroy(): void {
    this.ideaStoreSubscription?.unsubscribe()
  }

  openFullDrawer(fullTitle: string, fullComponent: string): void {
    this.ideaStore.dispatch(OPEN_FULL_DRAWER({fullTitle, fullComponent}))
  }


}
