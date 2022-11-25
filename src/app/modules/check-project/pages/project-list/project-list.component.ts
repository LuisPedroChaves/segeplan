import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


import { IProject } from 'src/app/core/models/seguimiento/project';
import { ChekProjectService } from '../../../../core/services/httpServices/chek-project.service';
import { OPEN_FORM_DRAWER } from '../../../../store/actions';
import { AppState } from '../../../../store/app.reducer';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  storeSubscription = new Subscription;
  @ViewChild('formDrawer') formDrawer!: MatDrawer;


  projects: IProject[];

  displayedColumns = ['process', 'sector', 'munic', 'nameProject', 'advance', 'actions'];
  // displayedColumns = ['process', 'sector', 'munic', 'nameProject', 'actions'];
  dataSource = new MatTableDataSource<IProject>([]);

  constructor(
    public store: Store<AppState>,
    private chekProjectService: ChekProjectService,
  ) { }

  ngOnInit(): void {
    this.storeSubscription = this.store.select('drawer')
      .subscribe(state => {
        if (this.formDrawer) {
          this.formDrawer.opened = state.formDrawer
        }
      });
    this.getProjects();
  }

  getProjects(): void {
    this.chekProjectService.getAllProjects()
      .subscribe(data => {
        this.projects = data;
        this.dataSource = new MatTableDataSource<IProject>(this.projects);
        console.log(this.dataSource)
      })
  }

  openFormDrawer(formTitle: string, formComponent: string): void {
    console.log('Entro a la funcion')
    this.store.dispatch(OPEN_FORM_DRAWER({ formTitle, formComponent }))
  }

}
