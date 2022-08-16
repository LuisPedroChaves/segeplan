import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { READ_DONE_IDEAS } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-done-ideas',
  templateUrl: './done-ideas.component.html',
  styleUrls: ['./done-ideas.component.scss']
})
export class DoneIdeasComponent implements OnInit, OnDestroy {

  ideaStoreSubscription = new Subscription();
  doneIdeas: GeneralInformation[] = []!

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {
    this.ideaStoreSubscription = this.ideaStore.select('idea')
    .subscribe(state => {
      this.doneIdeas = state.doneIdeas;
    })

    //TODO: Agregar ID  de la institcion al filtro
    this.ideaStore.dispatch(READ_DONE_IDEAS({filtro: {state: 'CALIFICADA'}}))
  }

  ngOnDestroy(): void {
    this.ideaStoreSubscription?.unsubscribe();
  }

}
