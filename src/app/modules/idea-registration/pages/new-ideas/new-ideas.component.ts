import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IdeaStore } from 'src/app/store/reducers';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { OPEN_FULL_DRAWER, READ_IDEAS, SET_IDEA } from 'src/app/store/actions';
import { FiltroIdeas } from '../../../../core/models/adicionales/filtroIdeas';
import { User } from '../../../../core/models/adicionales/user';
import { AppState } from 'src/app/store/app.reducer';

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
  number = '';

  filtro: FiltroIdeas;

  sessionSubscription: Subscription;
  usuario: User;

  constructor(
    private ideaStore: Store<IdeaStore>,
    public store: Store<AppState>,

  ) { }

  ngOnInit(): void {
    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.ideas = state.ideas;
      })

    this.ideaStore.dispatch(READ_IDEAS({ filtro: { state: this.state } }))

    this.sessionSubscription = this.store.select('session').subscribe(session => {
      if (session.session) {
        this.usuario = session.session.usuario;
      }
    });
  }

  sendFilter(): void {

    this.filtro = { state: this.state };
    if (this.author !=  'TODOS') {
      // this.filtro.
    }
    if (this.number && this.number != '') {
      this.filtro.number = this.number;
    }
    this.ideaStore.dispatch(READ_IDEAS({ filtro: this.filtro }))
  }

  ngOnDestroy(): void {
    this.ideaStoreSubscription?.unsubscribe();
    this.sessionSubscription.unsubscribe();
  }
}
