import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GeneralInformation } from '../../models/GeneralInformation';

@Injectable({
  providedIn: 'root',
})
export class GeneralInformationService {
    private API_URL = environment.root;
    private urlGeneralInformation = 'api/general/problemDefinition';

      constructor(private http: HttpClient, private router: Router) {}

    sendGeneralInformation( generalInformationSend: GeneralInformation): Observable<any> {
        const url = this.API_URL + this.urlGeneralInformation;
        return this.http.post(url, generalInformationSend).pipe(
            map((res: any) => {
            return res;
            })
        );
    }
}
