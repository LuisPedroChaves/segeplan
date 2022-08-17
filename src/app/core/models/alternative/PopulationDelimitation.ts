export interface PopulationDelimitation {
    codigo?: string;
    AlternativeId?: string;
    referencePopulationId: string;
    denominationId: string;
    totalPopulation: number;
    gender: string;
    estimateBeneficiaries: number;
    preliminaryCharacterization: string;
    coverage?: number;
}
