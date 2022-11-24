import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


import { IProject } from 'src/app/core/models/seguimiento/project';
import { ChekProjectService } from '../../../../core/services/httpServices/chek-project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: IProject[];

  displayedColumns = ['process', 'sector', 'munic', 'nameProject', 'advance', 'actions'];
  // displayedColumns = ['process', 'sector', 'munic', 'nameProject', 'actions'];
  dataSource = new MatTableDataSource<IProject>([]);

  constructor(
    private chekProjectService: ChekProjectService,
  ) { }

  ngOnInit(): void {
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

}
