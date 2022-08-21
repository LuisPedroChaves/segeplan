export interface Qualification {
    codigo?: string;
    AlterId?: string;
    descriptionProblem?: number;
    descriptionProblemDescription?: string;

    generalObjective?: number;
    generalObjectiveDescription?: string;

    analysisDelimitation?: number;
    analysisDelimitationDescription?: string;

    terrainIdentification?: number;
    terrainIdentificationDescription?: string;

    legalSituation: number;
    legalSituationDescription: string;

    descriptionAnalysis?: number;
    descriptionAnalysisDescription?: string;
    
    descriptionGeneral?: number,
    total?: number,
    result?: number,
}
