import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/adicionales/user';
import { IdeaAlternative } from 'src/app/core/models/alternative/ideaAlternative';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { ConvertService } from 'src/app/core/services/internal/convert.service';
import { CLOSE_FULL_DRAWER2, OPEN_FULL_DRAWER, SET_IDEA } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';
import { IdeaStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-idea-card-mini',
  templateUrl: './idea-card-mini.component.html',
  styleUrls: ['./idea-card-mini.component.scss']
})
export class IdeaCardMiniComponent implements OnInit {
  panelOpenState = false;

  @Input('idea') idea: GeneralInformation;

  sessionSubscription: Subscription;
  usuario: User;

  constructor(
    private ideaStore: Store<IdeaStore>,
    public store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.sessionSubscription = this.store.select('session').subscribe(session => {
      if (session.session) {
        this.usuario = session.session.usuario;
      }
    });
  }

  openFullDrawer(idea: GeneralInformation): void {

    this.ideaStore.dispatch(CLOSE_FULL_DRAWER2())

    this.ideaStore.dispatch(SET_IDEA({ idea }))
    this.ideaStore.dispatch(OPEN_FULL_DRAWER({ fullTitle: 'Detalles de idea', fullComponent: 'SELECTED_IDEA' }))
  }

  printReport(alternative: IdeaAlternative) {
    if (alternative.qualification.result == 'PERTINENTE') {
      if (alternative?.preInvestment?.etapaResultado) {
        let print = ConvertService.createIdeaReportPertinenceAndPreinvestment(this.idea, alternative);
      } else {
        let printf = ConvertService.createIdeaReportPertinence(this.idea, alternative);
      }
    }
    else {
      let printf = ConvertService.createIdeaReportPertinence(this.idea, alternative);
    }

  }

}
