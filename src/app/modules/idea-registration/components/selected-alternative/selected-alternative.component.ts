import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IdeaAlternative } from 'src/app/core/models/alternative/ideaAlternative';

import { AlternativeStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-selected-alternative',
  templateUrl: './selected-alternative.component.html',
  styleUrls: ['./selected-alternative.component.scss']
})
export class SelectedAlternativeComponent implements OnInit, OnDestroy {

  alternativeStoreSubscription = new Subscription()

  currentAlternative: IdeaAlternative = null!;

  constructor(
    private alternativeStore: Store<AlternativeStore>,
  ) { }

  ngOnInit(): void {
    this.alternativeStoreSubscription = this.alternativeStore.select('alternative')
      .subscribe(state => {
        this.currentAlternative = state.alternative
      })
  }

  ngOnDestroy(): void {
    this.alternativeStoreSubscription?.unsubscribe()
  }

}
