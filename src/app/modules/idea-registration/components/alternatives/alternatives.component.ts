import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { OPEN_FULL_DRAWER2 } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-alternatives',
  templateUrl: './alternatives.component.html',
  styleUrls: ['./alternatives.component.scss']
})
export class AlternativesComponent implements OnInit {

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

  openFullDrawer2(fullTitle2: string, fullComponent2: string): void {
    this.ideaStore.dispatch(OPEN_FULL_DRAWER2({fullTitle2, fullComponent2}))
  }

}
