import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FiltroIdeas } from '../../models/adicionales/filtroIdeas';
import { GeneralInformation } from '../../models/informationGeneral/GeneralInformation';

@Injectable({
  providedIn: 'root',
})
export class GeneralInformationService {
    private API_URL = environment.root;
    private urlGeneralInformation = 'api/general/information';

      constructor(private http: HttpClient, private router: Router) {}

    sendGeneralInformation( generalInformationSend: GeneralInformation): Observable<any> {
        const url = this.API_URL + this.urlGeneralInformation;
        return this.http.post(url, generalInformationSend).pipe(
            map((res: any) => {
            return res;
            })
        );
    }

    getIdeas(filtros?: FiltroIdeas): Observable<any> {
      const url = this.API_URL + this.urlGeneralInformation;
      if (filtros){ 
        console.log(filtros)
        const httpParams = new HttpParams({ fromObject: { ...filtros } });

        return this.http.get(url, {params: httpParams}).pipe(
          map((res: any) => {
            return res.generalInformations;
          })
        )
      }
      else {
        return this.http.get(url).pipe(
          map((res: any) => {
            return res.generalInformations;
          })
        )
      }

    }
}
