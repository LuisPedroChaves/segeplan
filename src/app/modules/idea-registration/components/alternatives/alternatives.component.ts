import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IdeaAlternative } from 'src/app/core/models/alternative/ideaAlternative';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { GeneralInformationService } from 'src/app/core/services/httpServices/generalInformation.service';
import { OPEN_FULL_DRAWER2 } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-alternatives',
  templateUrl: './alternatives.component.html',
  styleUrls: ['./alternatives.component.scss']
})
export class AlternativesComponent implements OnInit {

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

  constructor(
    private ideaStore: Store<IdeaStore>,
    private generalInformationService: GeneralInformationService
  ) { }

  ngOnInit(): void {

    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.currentIdea = state.idea;
        this.getAlternatives()
      })

  }

  openFullDrawer2(fullTitle2: string, fullComponent2: string): void {
    this.ideaStore.dispatch(OPEN_FULL_DRAWER2({ fullTitle2, fullComponent2 }))
  }

  getAlternatives(): void {
    console.log(this.currentIdea);
    this.generalInformationService.getAlternatives(this.currentIdea.codigo)
      .subscribe(data => this.alternatives = data);
  }

}
