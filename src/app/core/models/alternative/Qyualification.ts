import { DataGeo } from "./DataGeo";

export interface Qualification {
    codigo?: string;
    AlterId?: string;
    descProblem?: number;
    descProblemComment?: string;

    generalObjct?: number;
    generalObjctComment?: string;

    anlysDelimitation?: number;
    anlysDelimitationComment?: string;

    terrainIdent?: number;
    terrainIdentComment?: string;

    legalSituation: number;
    legalSituationComment: string;
    terreno?: string;

    descAnlys?: number;
    descAnlysComment?: string;
    
    descriptionGeneral?: string,
    total?: number,
    result?: string,
}
