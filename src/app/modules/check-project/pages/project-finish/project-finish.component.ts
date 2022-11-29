import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IFiltroCheckProjects } from 'src/app/core/models/adicionales/filtro-check-projects';
import { IProject } from 'src/app/core/models/seguimiento/project';
import { OPEN_FULL_DRAWER, READ_CHECK_PROJECTS, SET_PROJECT } from 'src/app/store/actions';
import { CheckProjectStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-project-finish',
  templateUrl: './project-finish.component.html',
  styleUrls: ['./project-finish.component.scss']
})
export class ProjectFinishComponent implements OnInit, OnDestroy {

  @ViewChild('formDrawer') formDrawer!: MatDrawer;

  drawerSubscription = new Subscription;

  checkProjectSubscription = new Subscription

  filtros: IFiltroCheckProjects = {
    isMinistry: false
  }
  displayedColumns = ['process', 'sector', 'munic', 'nameProject', 'advance', 'actions'];
  dataSource = new MatTableDataSource<IProject>([]);

  constructor(
    public checkProjectStore: Store<CheckProjectStore>,
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

  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe()
    this.checkProjectSubscription?.unsubscribe()
  }

  openFullDrawer(fullTitle: string, fullComponent: string, checkProject: IProject): void {
    this.checkProjectStore.dispatch(SET_PROJECT({ checkProject }))
    this.checkProjectStore.dispatch(OPEN_FULL_DRAWER({ fullTitle, fullComponent }))
  }

}
