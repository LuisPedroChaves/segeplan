import { ITrack } from './progress';

export interface IProject {
    id?: string;
    author?: string;
    advance?: number;
    status?: string;
    correlative?: number;
    process: string;
    sector: string;
    nameProject: string;
    isMinistry: boolean;
    legalLand: boolean;
    agripManage: boolean;
    snipCode: string;
    observations: string;
    depto?: string;
    munic?: string;
    ministry?: string;
    tracking?: ITrack[];
}
