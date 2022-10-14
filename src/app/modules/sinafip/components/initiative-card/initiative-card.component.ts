import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { IRequest } from 'src/app/core/models/sinafip/request';
import { InitiativeStore } from 'src/app/store/reducers';
import { Activity } from 'src/app/core/models/sinafip/activity';
import { User } from '../../../../core/models/adicionales/user';
import { AppState } from '../../../../store/app.reducer';
import { SinafipService } from '../../../../core/services/httpServices/sinafip.service';
import { CLOSE_FULL_DRAWER } from '../../../../store/actions';

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

  sessionSubscription: Subscription;
  usuario: User;

  constructor(
    private initiativeStore: Store<InitiativeStore>,
    private store: Store<AppState>,
    private sinafipService: SinafipService,
  ) { }

  ngOnInit(): void {
    this.sessionSubscription = this.store.select('session').subscribe(session => {
      this.usuario = session.session.usuario;
    });

    this.initiativeStoreSubscription = this.initiativeStore.select('initiative')
      .subscribe(state => {

        if (state.initiative) {
          this.initiative = state.initiative
          this.dataSource = new MatTableDataSource<Activity>(this.initiative.requirementsDocuments.stimatedBudget.activities)
        }

      })
  }
  changeStatus(status: string, idSolicitud: string): void {
    console.log(status, idSolicitud)
    let resService = this.sinafipService.updateStatus(status, idSolicitud)
      .subscribe(res => {
        console.log(res);
        this.store.dispatch(CLOSE_FULL_DRAWER())
      })
  }

  ngOnDestroy(): void {

    this.initiativeStoreSubscription?.unsubscribe()
    this.sessionSubscription?.unsubscribe()

  }

}
