import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


import { IProject } from 'src/app/core/models/seguimiento/project';
import { OPEN_FORM_DRAWER, OPEN_FULL_DRAWER, READ_CHECK_PROJECTS, SET_PROJECT } from 'src/app/store/actions';
import { CheckProjectStore } from 'src/app/store/reducers';
import { IFiltroCheckProjects } from '../../../../core/models/adicionales/filtro-check-projects';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  @ViewChild('formDrawer') formDrawer!: MatDrawer;

  drawerSubscription = new Subscription;

  checkProjectSubscription = new Subscription

  filtro: IFiltroCheckProjects = {
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

        if (this.filtro.isMinistry != state.isMinistry) {

          this.checkProjectStore.dispatch(READ_CHECK_PROJECTS({
            filtro: {
              ...this.filtro,
              isMinistry: state.isMinistry
            }
          }))

        }

        this.filtro = {
          ...this.filtro,
          isMinistry: state.isMinistry
        }

        this.dataSource = new MatTableDataSource<IProject>([...state.projects]);

      })

    this.checkProjectStore.dispatch(READ_CHECK_PROJECTS({ filtro: this.filtro }))
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
