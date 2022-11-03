import { IProgress } from "./progress";

export interface ITrack {
    id?: string;
    author: string;
    correlative: number;
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
    tracking: IProgress[];
}
