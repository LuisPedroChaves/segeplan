import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IRequest } from 'src/app/core/models/sinafip/request';
import { OPEN_FULL_DRAWER, SET_INITIATIVE } from 'src/app/store/actions';
import { InitiativeStore } from 'src/app/store/reducers';
import { SinafipService } from '../../../../core/services/httpServices/sinafip.service';

@Component({
  selector: 'app-new-iniciatives',
  templateUrl: './new-iniciatives.component.html',
  styleUrls: ['./new-iniciatives.component.scss']
})
export class NewIniciativesComponent implements OnInit, OnDestroy {

  displayedColumns = ['entity', 'name', 'objetive', 'cost', 'asingment', 'state', 'actions'];
  dataSource = new MatTableDataSource<IRequest>([]);

  initiativeSubscription = new Subscription()
  initiatives: IRequest[] = [];

  constructor(
    private initiativeStore: Store<InitiativeStore>,
    private sinafipService: SinafipService
  ) { }

  ngOnInit(): void {

    this.initiativeSubscription = this.sinafipService.getAllRequest()
      .subscribe(data => {
        this.initiatives = data
        this.dataSource =  new MatTableDataSource<IRequest>(this.initiatives);
        console.log(this.dataSource)
      })

  }

  ngOnDestroy(): void {

    this.initiativeSubscription?.unsubscribe()

  }


  openFullDrawer(initiative: IRequest, fullTitle: string, fullComponent: string): void {

    this.initiativeStore.dispatch(SET_INITIATIVE({ initiative }))

    this.initiativeStore.dispatch(OPEN_FULL_DRAWER({ fullTitle, fullComponent }))
  }


}
