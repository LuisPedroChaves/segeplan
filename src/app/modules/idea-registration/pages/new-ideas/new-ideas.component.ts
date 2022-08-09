import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IdeaStore } from 'src/app/store/reducers';
import { GeneralInformation } from 'src/app/core/models/GeneralInformation';
import { READ_IDEAS } from 'src/app/store/actions';

@Component({
  selector: 'app-new-ideas',
  templateUrl: './new-ideas.component.html',
  styleUrls: ['./new-ideas.component.scss']
})
export class NewIdeasComponent implements OnInit {
  ideaStoreSubscription = new Subscription();
  ideas: GeneralInformation[] = []!

  constructor(
    private ideaStore: Store<IdeaStore>,

  ) { }

  ngOnInit(): void {
    this.ideaStore.dispatch(READ_IDEAS())
    this.ideaStoreSubscription = this.ideaStore.select('idea')
    .subscribe(state => {
      this.ideas = state.ideas;
    })
  }

  ngOnDestroy(): void {
    this.ideaStoreSubscription?.unsubscribe();
  }

}
