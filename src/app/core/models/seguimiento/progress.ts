import { IAdvisoryEpi } from "./advisoryEpi";
import { IAdvisoryDoc } from './advisoryDoc';
import { IVisitCard } from './visitCard';

export interface ITrack {
    id?: string;
    iapa: number;
    iapb: number;
    iapc: number;
    activity: string;
    reportDate: string;
    projectId?: string;
    advisoryEpi?: IAdvisoryEpi;
    advisoryDoc?: IAdvisoryDoc;
    visitCard?: IVisitCard;
}
