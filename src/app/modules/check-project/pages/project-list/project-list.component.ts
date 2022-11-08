import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


import { IProject } from 'src/app/core/models/seguimiento/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  displayedColumns = ['process', 'sector', 'munic', 'nameProject', 'state', 'actions'];
  dataSource = new MatTableDataSource<IProject>([]);

  constructor() { }

  ngOnInit(): void {
  }

}
