import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { READ_SEND_IDEAS } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-revelance-matrix',
  templateUrl: './revelance-matrix.component.html',
  styleUrls: ['./revelance-matrix.component.scss']
})
export class RevelanceMatrixComponent implements OnInit, OnDestroy {

  ideaStoreSubscription = new Subscription();
  ideas: GeneralInformation[] = []!

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {
    this.ideaStoreSubscription = this.ideaStore.select('idea')
    .subscribe(state => {
      this.ideas = state.sendIdeas;
    })

    this.ideaStore.dispatch(READ_SEND_IDEAS({filtro: {state: 'ENVIADA'}}))
  }

  ngOnDestroy(): void {
    this.ideaStoreSubscription?.unsubscribe();
  }

}
