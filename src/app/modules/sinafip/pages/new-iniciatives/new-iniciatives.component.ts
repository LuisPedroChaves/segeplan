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
      })

  }

  ngOnDestroy(): void {

    this.initiativeSubscription?.unsubscribe()

  }


  openFullDrawer(initiative: IRequest): void {

    this.initiativeStore.dispatch(SET_INITIATIVE({ initiative }))

    this.initiativeStore.dispatch(OPEN_FULL_DRAWER({ fullTitle: initiative.investment.nameProject, fullComponent: 'SELECTED_INITIATIVE' }))
  }


}

const ELEMENT_DATA: any[] = [
  {entity: 'INDE', name: 'Proyecto de ejecución', objetive: ' Ejecutar proyecto pactado', cost: 'Q.30000.00 ', state: 'CREADA', asingment: 'APORTACIONES DEL ESTADO', actions: null},
  {entity: 'INACIF', name: 'Proyecto de construcción', objetive: 'Construir una nueva sede', cost: 'Q.25000.00', state: 'ADMITIDA', asingment: 'PRESTAMO', actions: null},
  {entity: 'INGUAT', name: 'Proyecto para apliacion', objetive: 'Apliacion de presupuesto ', cost: 'Q.150000.00 ', state: 'EN RECEPCION', asingment: 'TRASFERENCIA NO REEMBOLSABLE', actions: null},
];
