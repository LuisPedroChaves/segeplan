import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { OPEN_FULL_DRAWER } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.scss']
})
export class IdeaCardComponent implements OnInit {

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

  openFullDrawer(fullTitle: string, fullComponent: string): void {
    this.ideaStore.dispatch(OPEN_FULL_DRAWER({fullTitle, fullComponent}))
  }

}
