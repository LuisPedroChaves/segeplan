import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IRequest } from 'src/app/core/models/sinafip/request';

@Injectable({
  providedIn: 'root',
})
export class SinafipService {
  private API_URL = environment.root;
  private url = 'api/sinafip/';

  constructor(private http: HttpClient, private router: Router) { }

  getAllRequest(): Observable<IRequest[]> {
    const url = this.API_URL + this.url + 'request/get-all';
    return this.http.get(url).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getEntities(): Observable<any> {
    const url = this.API_URL + this.url + 'entities';
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getProjectFunction(): Observable<any> {
    const url = this.API_URL + this.url + 'project-function';
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getGeneralStudies(): Observable<any> {
    const url = this.API_URL + this.url + 'general-studies';
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getPreinvDocument(): Observable<any> {
    const url = this.API_URL + this.url + 'preinv-document';
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getModalityFinancing(): Observable<any> {
    const url = this.API_URL + this.url + 'modality-financing';
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // http://localhost:3000/api/sinafip/request/denied/:idSolicitud
  //status pueden ser:  ['reception', 'analysis', 'denied'];
  updateStatus(status: string, idSolicitud: string): Observable<any> {
    const url = `${this.API_URL}${this.url}request/${status}/${idSolicitud}`;
    return this.http.put(url, '').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  createRequest(request: IRequest): Observable<IRequest> {
    const url = this.API_URL + this.url + 'request/new';
    return this.http.post(url, request).pipe(
      map((res: any) => {
        return res.request;
      })
    )
  }
}
