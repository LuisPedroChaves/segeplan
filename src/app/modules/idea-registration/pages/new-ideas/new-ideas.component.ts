import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IdeaStore } from 'src/app/store/reducers';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { OPEN_FULL_DRAWER, READ_IDEAS, SET_IDEA } from 'src/app/store/actions';

@Component({
  selector: 'app-new-ideas',
  templateUrl: './new-ideas.component.html',
  styleUrls: ['./new-ideas.component.scss']
})
export class NewIdeasComponent implements OnInit {
  ideaStoreSubscription = new Subscription();
  ideas: GeneralInformation[] = []!
  state = 'TODAS';
  author = 'TODOS';

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {
    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.ideas = state.ideas;
      })

    this.ideaStore.dispatch(READ_IDEAS({ filtro: { state: this.state } }))
  }

  sendFilter(): void {
    // this.ideaStoreSubscription = this.ideaStore.select('idea')
    //   .subscribe(state => {
    //     this.ideas = state.ideas;
    //   });
    this.ideaStore.dispatch(READ_IDEAS({ filtro: { state: this.state } }))
  }

  ngOnDestroy(): void {
    this.ideaStoreSubscription?.unsubscribe();
  }
}
