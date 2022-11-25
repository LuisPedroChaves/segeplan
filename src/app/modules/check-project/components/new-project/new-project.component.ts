import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Departament } from 'src/app/core/models/adicionales/department';
import { CLOSE_FORM_DRAWER, CLOSE_FULL_DRAWER, OPEN_FORM_DRAWER, READ_GEOGRAFICOS } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';
import { GeograficoStore } from 'src/app/store/reducers';
import { ITrack } from '../../../../core/models/seguimiento/progress';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit, OnDestroy {

  @ViewChild('formDrawer') formDrawer!: MatDrawer;

  drawerSubscription = new Subscription();
  fullTitle = '';
  formTitle = ''
  formComponent = '';

  newProject = new FormGroup({
    process: new FormControl(null, Validators.required),
    sector: new FormControl(null, Validators.required),
    nameProject: new FormControl(null, Validators.required),
    departament: new FormControl(null, Validators.required),
    municipality: new FormControl(null, Validators.required),
    legalLand: new FormControl(false, Validators.required),
    agripManage: new FormControl(false, Validators.required),
    observations: new FormControl(null, Validators.required),
  })

  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();

  displayedColumns = ['iapa', 'iapb', 'iapc', 'activity', 'reportDate', 'actions'];
  dataSource = new MatTableDataSource<ITrack>([])

  constructor(
    public store: Store<AppState>,
    private geograficoStore: Store<GeograficoStore>,
  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.store.select('drawer')
    .subscribe(state => {

      this.fullTitle = state.fullTitle
      if (this.formDrawer) {
        this.formDrawer.opened = state.formDrawer
        this.formComponent = state.formComponent
        this.formTitle = state.formTitle
      }

    });


    this.departamentoStoreSubscription = this.geograficoStore.select('geografico')
      .subscribe(state => {
        this.departamentos = state.geograficos;
      })
    this.geograficoStore.dispatch(READ_GEOGRAFICOS());

  }

  ngOnDestroy(): void {
      this.drawerSubscription?.unsubscribe()
      this.departamentoStoreSubscription?.unsubscribe()
  }

  closeFullDrawer(): void {
    this.store.dispatch(CLOSE_FULL_DRAWER())
  }


  openFormDrawer(formTitle: string, formComponent: string): void {
    this.store.dispatch(OPEN_FORM_DRAWER({ formTitle, formComponent }))
  }

  closeFormDrawer(): void {
    this.store.dispatch(CLOSE_FORM_DRAWER())
  }

  selecDepartament(): void {
    window.alert('Opción aun no habilitada')
    // let dptoSelect = this.delimit.controls['departament'].value;
    // let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    // if (dpto) { this.municipios = dpto.municipios }
  }

  onSubmit(): void {

  }

}
