import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable, Subject } from 'rxjs';
import { IProject } from '../../models/seguimiento/project';
import { ITrack } from '../../models/seguimiento/progress';
import { IFiltroCheckProjects } from '../../models/adicionales/filtro-check-projects';

@Injectable({
  providedIn: 'root'
})
export class ChekProjectService {
  private API_URL = environment.root;
  private url = 'api/seguimiento/';

  constructor(private http: HttpClient,) { }

  getAllProjects(filtros: IFiltroCheckProjects): Observable<any> {
    const url = this.API_URL + this.url + 'project/get-all';
    return this.http.get(url,
      {
        params: new HttpParams({ fromObject: { ...filtros } })
      })
      .pipe(
        map((res: any) => {
          return res.projects;
        })
      );
  }

  getProjectById(idProject: string): Observable<any> {
    const url = this.API_URL + this.url + 'project/' + idProject;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res.project;
      })
    );
  }

  createProject(project: IProject): Observable<IProject> {
    const url = this.API_URL + this.url + 'project/new';
    return this.http.post(url, project).pipe(
      map((res: any) => {
        return res.project;
      })
    )
  }

  addTrack(track: ITrack, idProject: string): Observable<IProject> {
    const url = this.API_URL + this.url + 'project/track/' + idProject;
    return this.http.post(url, track).pipe(
      map((project: IProject) => {
        return project;
      })
    )
  }

}
