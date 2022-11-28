import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Departament } from 'src/app/core/models/adicionales/department';
import { CLOSE_FORM_DRAWER, CLOSE_FULL_DRAWER, OPEN_FORM_DRAWER, READ_GEOGRAFICOS } from 'src/app/store/actions';
import { CheckProjectStore, GeograficoStore } from 'src/app/store/reducers';
import { ITrack } from 'src/app/core/models/seguimiento/progress';
import { IProject } from 'src/app/core/models/seguimiento/project';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { CREATE_CHECK_PROJECT } from '../../../../store/actions/checkProject.actions';

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
    observations: new FormControl(null, Validators.required),
    agripManage: new FormControl(false, Validators.required),
    legalLand: new FormControl(false, Validators.required),
    snipCode: new FormControl(null, Validators.required),
  })

  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();


  displayedColumns = ['iapa', 'iapb', 'iapc', 'activity', 'reportDate', 'actions'];
  dataSource = new MatTableDataSource<ITrack>([])

  checkProjectSubscription = new Subscription()
  project: IProject = null;
  isMinistry = false;

  constructor(
    public checkProjectStore: Store<CheckProjectStore>,
    private geograficoStore: Store<GeograficoStore>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.checkProjectStore.select('drawer')
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

    this.checkProjectSubscription = this.checkProjectStore.select('checkProject')
      .subscribe(state => {

        this.isMinistry = state.isMinistry
        this.project = state.project

      })

  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe()
    this.departamentoStoreSubscription?.unsubscribe()
    this.checkProjectSubscription?.unsubscribe()
  }

  closeFullDrawer(): void {
    this.checkProjectStore.dispatch(CLOSE_FULL_DRAWER())
  }

  openFormDrawer(formTitle: string, formComponent: string): void {
    this.checkProjectStore.dispatch(OPEN_FORM_DRAWER({ formTitle, formComponent }))
  }

  closeFormDrawer(): void {
    this.checkProjectStore.dispatch(CLOSE_FORM_DRAWER())
  }

  selecDepartament(): void {
    // window.alert('Opción aun no habilitada')
    let dptoSelect = this.newProject.controls['departament'].value;
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto) { this.municipios = dpto.municipios }
  }

  resetNewProject(): void {

    this.newProject.reset({
      agripManage: false,
      legalLand: false
    })

  }

  onSubmit(): void {

    if (this.newProject.invalid) {
      return;
    }

    const {
      process,
      sector,
      nameProject,
      departament,
      municipality,
      observations,
      agripManage,
      legalLand,
      snipCode } = this.newProject.value;

    if (!this.project) {

      this.project = {
        process,
        sector,
        nameProject,
        isMinistry: this.isMinistry,
        depto: departament,
        munic: municipality,
        observations,
        agripManage,
        legalLand,
        snipCode
      }

      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '250px',
        data: { title: 'Registrar Proyecto', description: '¿Esta Seguro que desea registrar los datos del Proyecto?', confirmation: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        if (result === true) {

          this.checkProjectStore.dispatch(CREATE_CHECK_PROJECT({ checkProject: this.project }))
          this.checkProjectStore.dispatch(CLOSE_FORM_DRAWER())
          this.checkProjectStore.dispatch(CLOSE_FULL_DRAWER())
          this.resetNewProject()

        } else {
          return;
        }
      });


    }

    //TODO: Agregar editar

  }

}
