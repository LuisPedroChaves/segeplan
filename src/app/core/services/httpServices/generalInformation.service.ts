import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FiltroIdeas } from '../../models/adicionales/filtroIdeas';
import { IdeaAlternative } from '../../models/alternative/ideaAlternative';
import { GeneralInformation } from '../../models/informationGeneral/GeneralInformation';

@Injectable({
    providedIn: 'root',
})
export class GeneralInformationService {
    private API_URL = environment.root;
    private urlGeneralInformation = 'api/general/information';
    private urlAlternative = 'api/alternative/';

    constructor(private http: HttpClient, private router: Router) { }

    sendGeneralInformation(generalInformationSend: GeneralInformation): Observable<any> {
        const url = this.API_URL + this.urlGeneralInformation;
        return this.http.post(url, generalInformationSend).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    getIdeas(filtros?: FiltroIdeas): Observable<any> {
        const url = this.API_URL + this.urlGeneralInformation;
        if (filtros) {
            console.log(filtros)
            const httpParams = new HttpParams({ fromObject: { ...filtros } });

            return this.http.get(url, { params: httpParams }).pipe(
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

    sendAlternative(alternative: IdeaAlternative): Observable<any> {
        const url = this.API_URL + this.urlAlternative;
        return this.http.post(url, alternative).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    getDenomination(): Observable<any> {
        const url = this.API_URL + this.urlAlternative + 'denomination';
        return this.http.get(url).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    getReferencePopulation(): Observable<any> {
        const url = this.API_URL + this.urlAlternative + 'referencePopulation';
        return this.http.get(url).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    getAlternatives(idIdea: string): Observable<any> {
        const url = this.API_URL + this.urlAlternative + idIdea;
        return this.http.get(url).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    getMatrizPertinencia(idAlternative: string): Observable<any> {
        const url = this.API_URL + this.urlAlternative + 'pertinencia/' + idAlternative;
        return this.http.get(url).pipe(
            map((res: any) => {
                return res;
            })
        );
    }
}
