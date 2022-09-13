import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { OPEN_FULL_DRAWER, SET_IDEA } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';
import { IdeaAlternative } from '../../../../core/models/alternative/ideaAlternative';
import { ConvertService } from '../../../../core/services/internal/convert.service';

@Component({
  selector: 'app-idea-card-mini',
  templateUrl: './idea-card-mini.component.html',
  styleUrls: ['./idea-card-mini.component.scss']
})
export class IdeaCardMiniComponent implements OnInit {
  panelOpenState = false;

  @Input('idea') idea: GeneralInformation;

  constructor(
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {
  }

  openFullDrawer(idea: GeneralInformation): void {

    this.ideaStore.dispatch(SET_IDEA({idea}))

    this.ideaStore.dispatch(OPEN_FULL_DRAWER({fullTitle: idea.registerCode, fullComponent: 'SELECTED_IDEA'}))
  }

  printReport(alternative: IdeaAlternative) {
    if (alternative.qualification.result == 'PERTINENTE') {
      let print = ConvertService.createIdeaReportPertinenceAndPreinvestment(this.idea, alternative);
    }
    else {
      let printf = ConvertService.createIdeaReportPertinence(this.idea, alternative);
    }

  }

}
