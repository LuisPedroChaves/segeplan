import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-iniciatives',
  templateUrl: './new-iniciatives.component.html',
  styleUrls: ['./new-iniciatives.component.scss']
})
export class NewIniciativesComponent implements OnInit {

  displayedColumns = ['entity', 'name', 'objetive', 'cost', 'state', 'asingment', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

const ELEMENT_DATA: any[] = [
  {entity: 'INDE', name: 'Proyecto de ejecución', objetive: ' Ejecutar proyecto pactado', cost: 'Q.30000.00 ', state: 'CREADA', asingment: 'Texto de Prueba', actions: null},
  {entity: 'INACIF', name: 'Proyecto de construcción', objetive: 'Construir una nueva sede', cost: 'Q.25000.00', state: 'ADMITIDA', asingment: 'Texto de Prueba', actions: null},
  {entity: 'INGUAT', name: 'Proyecto para apliacion', objetive: 'Apliacion de presupuesto ', cost: 'Q.150000.00 ', state: 'EN ADMISION', asingment: 'Texto de Prueba', actions: null},
];
