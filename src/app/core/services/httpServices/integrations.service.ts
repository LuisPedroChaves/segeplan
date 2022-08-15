import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FiltroIdeas } from '../../models/adicionales/filtroIdeas';

@Injectable({
    providedIn: 'root',
})
export class Integrations {
    private API_URL = environment.root;
    private urlIntegrations = 'api/integrations/';

    constructor(private http: HttpClient, private router: Router) { }

    getGeograficos(): Observable<any> {
        const url = this.API_URL + this.urlIntegrations + 'geograficos';
        return this.http.get(url).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    getProcesos(): Observable<any> {
        const url = this.API_URL + this.urlIntegrations + 'procesos';
        return this.http.get(url).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    getObjetos(): Observable<any> {
        const url = this.API_URL + this.urlIntegrations + 'objetos';
        return this.http.get(url).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    getProductos(): Observable<any> {
        const url = this.API_URL + this.urlIntegrations + 'productos';
        return this.http.get(url).pipe(
            map((res: any) => {
                return res.data;
            })
        );
    }
}
