import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IdeaAlternative } from 'src/app/core/models/alternative/ideaAlternative';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { GeneralInformationService } from 'src/app/core/services/httpServices/generalInformation.service';
import { OPEN_FULL_DRAWER2 } from 'src/app/store/actions';
import { IdeaStore, ProductStore } from 'src/app/store/reducers';
import { IProduct } from '../../../../core/models/adicionales/Product';
import { IntegrationsService } from '../../../../core/services/httpServices/integrations.service';
import * as actions from '../../../../store/actions'

@Component({
  selector: 'app-alternatives',
  templateUrl: './alternatives.component.html',
  styleUrls: ['./alternatives.component.scss']
})
export class AlternativesComponent implements OnInit {

  ideaStoreSubscription = new Subscription();
  productStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;
  products: IProduct[] = [];

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

  constructor(
    private ideaStore: Store<IdeaStore>,
    private productStore: Store<ProductStore>,
    private generalInformationService: GeneralInformationService,
    private integrationsService: IntegrationsService,

  ) { }

  ngOnInit(): void {

    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.currentIdea = state.idea;
        this.getAlternatives()
      });

  }

  openFullDrawer2(fullTitle2: string, fullComponent2: string): void {
    this.ideaStore.dispatch(OPEN_FULL_DRAWER2({ fullTitle2, fullComponent2 }))
  }

  getAlternatives(): void {
    console.log(this.currentIdea);
    this.generalInformationService.getAlternatives(this.currentIdea.codigo)
      .subscribe(data => {
        this.alternatives = data
      });
  }



}
