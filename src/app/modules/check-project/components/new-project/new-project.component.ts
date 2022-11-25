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
import { IProject } from '../../../../core/models/seguimiento/project';
import { AlertDialogComponent } from '../../../../shared/components/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ChekProjectService } from '../../../../core/services/httpServices/chek-project.service';

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

  project = new FormGroup({
    process: new FormControl(null, Validators.required),
    sector: new FormControl(null, Validators.required),
    nameProject: new FormControl(null, Validators.required),
    departament: new FormControl(null, Validators.required),
    municipality: new FormControl(null, Validators.required),
    observations: new FormControl(null, Validators.required),
    agripManage: new FormControl(null, Validators.required),
    legalLand: new FormControl(null, Validators.required),
    snipCode: new FormControl(null, Validators.required),
  })

  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();


  displayedColumns = ['iapa', 'iapb', 'iapc', 'activity', 'reportDate', 'actions'];
  dataSource = new MatTableDataSource<ITrack>([])

  constructor(
    public store: Store<AppState>,
    private geograficoStore: Store<GeograficoStore>,
    private dialog: MatDialog,
    private chekProjectService: ChekProjectService,
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
    // window.alert('Opción aun no habilitada')
    let dptoSelect = this.project.controls['departament'].value;
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto) { this.municipios = dpto.municipios }
  }

  onSubmit(): void {
    console.log(this.project.value)

    const { process, sector, nameProject, departament, municipality,
      observations, agripManage, legalLand, snipCode } = this.project.value;

    const projectModel: IProject = {
      process, sector, nameProject, isMinistry: false, depto: departament, munic: municipality,
      observations, agripManage, legalLand, snipCode
    }

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '250px',
      data: { title: 'Registrar Proyecto', description: '¿Esta Seguro que desea registrar los datos del Proyecto?', confirmation: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === true) {
        // Code of Work
        this.chekProjectService.createProject(projectModel)
          .subscribe(res => {
            this.project.reset();
            this.store.dispatch(CLOSE_FORM_DRAWER())
          })
      } else {
        return;
      }
    });


  }

}
