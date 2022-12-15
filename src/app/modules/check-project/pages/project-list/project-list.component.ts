import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';



import { IProject } from 'src/app/core/models/seguimiento/project';
import { OPEN_FORM_DRAWER, OPEN_FULL_DRAWER, READ_CHECK_PROJECTS, READ_GEOGRAFICOS, SET_PROJECT } from 'src/app/store/actions';
import { CheckProjectStore, GeograficoStore } from 'src/app/store/reducers';
import { IFiltroCheckProjects } from '../../../../core/models/adicionales/filtro-check-projects';
import { Departament } from '../../../../core/models/adicionales/department';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  @ViewChild('formDrawer') formDrawer!: MatDrawer;

  isMinistry = false;

  drawerSubscription = new Subscription;

  checkProjectSubscription = new Subscription

  filtros: IFiltroCheckProjects = {
    isMinistry: false,
    status: 'REGISTER',
  }

  months = [
    { value: 1, name: 'Enero' }, { value: 2, name: 'Febrero' }, { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' }, { value: 5, name: 'Mayo' }, { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' }, { value: 8, name: 'Agosto' }, { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' }, { value: 11, name: 'Noviembre' }, { value: 12, name: 'Diciembre' }
  ]

  displayedColumns = ['ministry', 'process', 'sector', 'munic', 'nameProject', 'advance', 'actions'];
  dataSource = new MatTableDataSource<IProject>([]);


  departamentoFilter = new FormControl('');
  municipioFilter = new FormControl('');
  entidadFilter = new FormControl('');
  monthFilter = new FormControl('');


  departamentos: Departament[] = [];
  municipios: Departament[] = [];
  departamentoStoreSubscription = new Subscription();


  constructor(
    public checkProjectStore: Store<CheckProjectStore>,
    private geograficoStore: Store<GeograficoStore>,

  ) { }

  ngOnInit(): void {

    this.drawerSubscription = this.checkProjectStore.select('drawer')
      .subscribe(state => {
        if (this.formDrawer) {
          this.formDrawer.opened = state.formDrawer
        }
      });

    this.checkProjectSubscription = this.checkProjectStore.select('checkProject')
      .subscribe(state => {

        this.isMinistry = state.isMinistry;
        if (this.filtros.isMinistry != state.isMinistry) {

          this.checkProjectStore.dispatch(READ_CHECK_PROJECTS({
            filtros: {
              ...this.filtros,
              isMinistry: state.isMinistry
            }
          }))
        }

        this.filtros = {
          ...this.filtros,
          isMinistry: state.isMinistry
        }

        this.dataSource = new MatTableDataSource<IProject>([...state.projects]);

      })

    this.checkProjectStore.dispatch(READ_CHECK_PROJECTS({ filtros: this.filtros }))


    this.departamentoStoreSubscription = this.geograficoStore.select('geografico')
      .subscribe(state => {
        console.log(state)
        this.departamentos = state.geograficos;
      })

    this.geograficoStore.dispatch(READ_GEOGRAFICOS());

  }

  selecDepartament(): void {
    // window.alert('Opción aun no habilitada')
    let dptoSelect = this.departamentoFilter.value;
    this.municipioFilter.reset();
    let dpto = this.departamentos.find((dto: Departament) => dto.NOMBRE == dptoSelect);
    if (dpto) { this.municipios = dpto.municipios }
  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe()
    this.checkProjectSubscription?.unsubscribe()
  }

  openFullDrawer(fullTitle: string, fullComponent: string, checkProject: IProject): void {
    this.checkProjectStore.dispatch(SET_PROJECT({ checkProject }))
    this.checkProjectStore.dispatch(OPEN_FULL_DRAWER({ fullTitle, fullComponent }))
  }

  searchProjects() {
    const newfiltros = {
      isMinistry: false,
      status: 'REGISTER',
    }
    this.filtros = newfiltros;
    if (this.departamentoFilter.value) {
      this.filtros.departamento = this.departamentoFilter.value;
    }
    if (this.municipioFilter.value) {
      this.filtros.municipio = this.municipioFilter.value;
    }
    // if (this.entidadFilter.value) {

    // }
    if (this.monthFilter.value) {
      this.filtros.mes = this.monthFilter.value;
    }

    console.log(this.filtros)
    this.checkProjectStore.dispatch(READ_CHECK_PROJECTS({ filtros: this.filtros }))
  }

  clearControls() {
    this.departamentoFilter.reset();
    this.municipioFilter.reset();
    this.entidadFilter.reset();
    this.monthFilter.reset();

    this.filtros = {
      isMinistry: false,
      status: 'REGISTER',
    }
    this.checkProjectStore.dispatch(READ_CHECK_PROJECTS({ filtros: this.filtros }))

  }

}
