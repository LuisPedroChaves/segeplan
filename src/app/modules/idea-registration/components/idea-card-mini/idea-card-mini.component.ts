import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';
import { OPEN_FULL_DRAWER, SET_IDEA } from 'src/app/store/actions';
import { IdeaStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-idea-card-mini',
  templateUrl: './idea-card-mini.component.html',
  styleUrls: ['./idea-card-mini.component.scss']
})
export class IdeaCardMiniComponent implements OnInit {

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

}
