import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CLOSE_FORM_DRAWER, CLOSE_FULL_DRAWER, CREATE_CHECK_PROJECT, OPEN_FORM_DRAWER, READ_GEOGRAFICOS } from 'src/app/store/actions';
import { CheckProjectStore, GeograficoStore } from 'src/app/store/reducers';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { Departament, IProject, ITrack } from '../../../../core/models';

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
    ministry: new FormControl(null, Validators.required),
  })

  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();


  displayedColumns = ['iapa', 'iapb', 'iapc', 'activity', 'reportDate', 'actions'];
  dataSource = new MatTableDataSource<ITrack>([])

  checkProjectSubscription = new Subscription()
  project: IProject = null;
  isMinistry = false;

  editProject = false
  editTracking = false
  elevationProject = 'mat-elevation-z0'
  elevationTracking = 'mat-elevation-z0'

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

        if (state.project) {
          this.setProject(state.project)
        }else {
          this.resetNewProject()
        }

      })

  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe()
    this.departamentoStoreSubscription?.unsubscribe()
    this.checkProjectSubscription?.unsubscribe()
  }

  closeFullDrawer(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '375px',
      data: { title: 'Cambios no guardados', description: '¿Seguro que quiere salir? Hay cambios sin guardar. Si abandona la página, los cambios se perderán.', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.checkProjectStore.dispatch(CLOSE_FULL_DRAWER())

      }

      return
    });
  }

  openFormDrawer(formTitle: string, formComponent: string): void {

    if (this.newProject.invalid) {

      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '250px',
        data: { title: 'Completar información', description: 'Primero debe completar toda la información del proyecto', confirmation: false }
      });

      return;
    }

    if (!this.project) {

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

      this.checkProjectStore.dispatch(CREATE_CHECK_PROJECT({ checkProject: this.project }))
      this.checkProjectStore.dispatch(OPEN_FORM_DRAWER({ formTitle, formComponent }))
      return
    }

    //TODO: Actualizar proyecto si existe el ID

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

    this.project = null
    this.dataSource = new MatTableDataSource<ITrack>([])

  }

  projectStyle($event): void {

    if (this.editProject === true) {
      this.elevationProject = 'mat-elevation-z8'
      return
    }

    this.elevationProject = $event.type == 'mouseover' ? 'mat-elevation-z8' : 'mat-elevation-z0';
  }

  outProject(): void {
    this.editProject = false
    this.elevationProject = 'mat-elevation-z0'
  }

  trackingStyle($event): void {

    if (this.editTracking === true) {
      this.elevationTracking = 'mat-elevation-z8'
      return
    }

    this.elevationTracking = $event.type == 'mouseover' ? 'mat-elevation-z8' : 'mat-elevation-z0';
  }

  outTracking(): void {
    this.editTracking = false
    this.elevationTracking = 'mat-elevation-z0'
  }

  setProject(project: IProject): void {
    this.project = project

    this.newProject.controls['process'].setValue(project.process)
    this.newProject.controls['sector'].setValue(project.sector)
    this.newProject.controls['nameProject'].setValue(project.nameProject)
    this.newProject.controls['departament'].setValue(project.depto)
    this.newProject.controls['municipality'].setValue(project.munic)
    this.newProject.controls['observations'].setValue(project.observations)
    this.newProject.controls['agripManage'].setValue(Boolean(project.agripManage))
    this.newProject.controls['legalLand'].setValue(Boolean(project.legalLand))
    this.newProject.controls['snipCode'].setValue(project.snipCode)

    setTimeout(() => {
      this.selecDepartament()
    }, 500);
    this.dataSource = new MatTableDataSource<ITrack>(this.project.tracking)
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
        data: { title: 'Registrar proyecto', description: '¿Esta Seguro que desea registrar los datos del Proyecto?', confirmation: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {

          this.checkProjectStore.dispatch(CREATE_CHECK_PROJECT({ checkProject: this.project }))
          this.checkProjectStore.dispatch(CLOSE_FORM_DRAWER())
          this.checkProjectStore.dispatch(CLOSE_FULL_DRAWER())
          this.resetNewProject()

        } else {
          return;
        }
      });

      return
    }

    this.project = {
      ...this.project,
      process,
      sector,
      nameProject,
      depto: departament,
      munic: municipality,
      observations,
      agripManage,
      legalLand,
      snipCode
    }

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '250px',
      data: { title: 'Actualizar proyecto', description: '¿Esta Seguro que desea actualizar los datos del Proyecto?', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
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

}
