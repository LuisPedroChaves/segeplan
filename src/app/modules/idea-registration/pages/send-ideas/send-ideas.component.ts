import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { READ_SEND_IDEAS } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-send-ideas',
  templateUrl: './send-ideas.component.html',
  styleUrls: ['./send-ideas.component.scss']
})
export class SendIdeasComponent implements OnInit, OnDestroy {

  ideaStoreSubscription = new Subscription();
  sendIdeas: GeneralInformation[] = []!

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {
    this.ideaStoreSubscription = this.ideaStore.select('idea')
    .subscribe(state => {
      this.sendIdeas = state.sendIdeas;
    })

    //TODO: Agregar ID  de la institcion al filtro
    this.ideaStore.dispatch(READ_SEND_IDEAS({filtro: {state: 'ENVIADA'}}))
  }

  ngOnDestroy(): void {
    this.ideaStoreSubscription?.unsubscribe();
  }
}
