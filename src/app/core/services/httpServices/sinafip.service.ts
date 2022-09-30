import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SinafipService {
    private API_URL = environment.root;
    private url = 'api/sinafip/';

    constructor(private http: HttpClient, private router: Router) { }

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
}
