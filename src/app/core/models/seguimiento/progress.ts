import { IAdvisoryEpi } from "./advisoryEpi";
import { IAdvisoryDoc } from './advisoryDoc';

export interface ITrack {
    id?: string;
    iapa: number;
    iapb: number;
    iapc: number;
    activity: string;
    reportDate: string;
    projectId?: number;
    advisoryEpi?: IAdvisoryEpi;
    advisoryDoc?: IAdvisoryDoc;
}
