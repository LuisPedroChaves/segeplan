import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FiltroIdeas } from '../../models/adicionales/filtroIdeas';
import { IdeaAlternative } from '../../models/alternative/ideaAlternative';
import { Qualification } from '../../models/alternative/Qyualification';
import { GeneralInformation } from '../../models/informationGeneral/GeneralInformation';

@Injectable({
    providedIn: 'root',
})
export class GeneralInformationService {
    private API_URL = environment.root;
    private urlGeneralInformation = 'api/general/information';
    private urlIdeas = 'api/general/';
    private urlAlternative = 'api/alternative/';

    constructor(private http: HttpClient, private router: Router) { }

    sendGeneralInformation(generalInformationSend: GeneralInformation): Observable<any> {
        const url = this.API_URL + this.urlGeneralInformation;
        console.log('NUEVA IDEA *** : ' + generalInformationSend);

        return this.http.post(url, generalInformationSend).pipe(
            map((res: any) => {
                return res.informationInsert;
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
                return res.data;
            })
        );
    }

    getReferencePopulation(): Observable<any> {
        const url = this.API_URL + this.urlAlternative + 'referencePopulation';
        return this.http.get(url).pipe(
            map((res: any) => {
                return res.data;
            })
        );
    }

    getAlternatives(idIdea: string): Observable<any> {
        const url = this.API_URL + this.urlAlternative + idIdea;
        return this.http.get(url).pipe(
            map((res: any) => {
                return res.data;
            })
        );
    }

    getMatrizPertinencia(idAlternative: string): Observable<any> {
        const url = this.API_URL + this.urlAlternative + 'pertinencia/' + idAlternative;
        return this.http.get(url).pipe(
            map((res: any) => {
                return res.data;
            })
        );
    }

    getMatrizPreinversion(idAlternative: string): Observable<any> {
        const url = this.API_URL + this.urlAlternative + 'preinversion/' + idAlternative;
        return this.http.get(url).pipe(
            map((res: any) => {
                return res.preInversion;
            })
        );
    }

    submitToQualify(idIdea: string): Observable<any> {
        const url = this.API_URL + this.urlIdeas + 'send-idea/' + idIdea;
        return this.http.get(url).pipe(
            map((res: any) => {
                return res.data;
            })
        );
    }

    qualifiedIdea(idIdea: string): Observable<any> {
        const url = this.API_URL + this.urlIdeas + 'return-idea/' + idIdea;
        return this.http.get(url).pipe(
            map((res: any) => {
                return res.data;
            })
        );
    }

    saveMatrixPertinence(matrixPertinence: Qualification): Observable<any> {
        const url = this.API_URL + this.urlAlternative + 'send-pertinencia/';
        return this.http.post(url, matrixPertinence).pipe(
            map((res: any) => {
                return res.data;
            })
        );
    }
}
