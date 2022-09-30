import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { IRequest } from 'src/app/core/models/sinafip/request';
import { InitiativeStore } from 'src/app/store/reducers';
import { Activity } from 'src/app/core/models/sinafip/activity';

@Component({
  selector: 'app-initiative-card',
  templateUrl: './initiative-card.component.html',
  styleUrls: ['./initiative-card.component.scss']
})
export class InitiativeCardComponent implements OnInit, OnDestroy {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  initiativeStoreSubscription = new Subscription()
  initiative: IRequest = null;

  displayedColumns = ['activity', 'unitMeasure', 'cant', 'priceU', 'subTotal'];
  dataSource = new MatTableDataSource<Activity>([])

  constructor(
    private initiativeStore: Store<InitiativeStore>
  ) { }

  ngOnInit(): void {

    this.initiativeStoreSubscription = this.initiativeStore.select('initiative')
      .subscribe(state => {

        if (state.initiative) {
          this.initiative = state.initiative
          this.dataSource = new MatTableDataSource<Activity>(this.initiative.requirementsDocuments.stimatedBudget.activities)
        }

      })

  }

  ngOnDestroy(): void {

      this.initiativeStoreSubscription?.unsubscribe()

  }

}
