import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IdeaAlternative } from 'src/app/core/models/alternative/ideaAlternative';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { GeneralInformationService } from 'src/app/core/services/httpServices/generalInformation.service';
import { OPEN_FULL_DRAWER2, SET_ALTERNATIVE } from 'src/app/store/actions';
import { AlternativeStore, IdeaStore, ProductStore } from 'src/app/store/reducers';
import { IProduct } from '../../../../core/models/adicionales/Product';
import { IntegrationsService } from '../../../../core/services/httpServices/integrations.service';
import * as actions from '../../../../store/actions'
import { AppState } from 'src/app/store/app.reducer';
import { User } from '../../../../core/models/adicionales/user';

@Component({
  selector: 'app-alternatives',
  templateUrl: './alternatives.component.html',
  styleUrls: ['./alternatives.component.scss']
})
export class AlternativesComponent implements OnInit, OnDestroy {

  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;

  alternatives: any[] = [
    {
      preliminaryName: {
        typeProject: 'Proyecto 1...',
        proccess: 'Process...',
        object: 'Object...'
      },
      projectDescription: {
        complexity: 'Alto...'
      }
    }
  ];

  sessionSubscription: Subscription;
  usuario: User;

  constructor(
    private ideaStore: Store<IdeaStore>,
    public store: Store<AppState>,
    private generalInformationService: GeneralInformationService,
  ) { }

  ngOnInit(): void {
    this.sessionSubscription = this.store.select('session').subscribe(session => {
      this.usuario = session.session.usuario;
      console.log(this.usuario);
    });

    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.currentIdea = state.idea;
        this.getAlternatives()
      });
  }

  ngOnDestroy(): void {
    this.ideaStoreSubscription?.unsubscribe()
    this.sessionSubscription?.unsubscribe()
  }

  openFullDrawer2(fullTitle2: string, fullComponent2: string, alternative: IdeaAlternative): void {
    this.ideaStore.dispatch(SET_ALTERNATIVE({ alternative }))
    this.ideaStore.dispatch(OPEN_FULL_DRAWER2({ fullTitle2, fullComponent2 }))
  }

  getAlternatives(): void {
    console.log(this.currentIdea);
    this.alternatives = this.currentIdea.alternatives
  }



}
