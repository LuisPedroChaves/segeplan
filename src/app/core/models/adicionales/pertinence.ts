
export interface IPertinence {
    criterio1: criterio1,
    criterio2: criterio2,
    criterio3: criterio3,
    criterio4: criterio4,
    criterio5: criterio5,
    criterio6: criterio6,
}

export interface criterio1 {
    baseLine: string
}

export interface criterio2 {
    generalObjective: string,
    expectedChange: string,
}
export interface criterio3 {
    totalPopulation: number,
    gender: string,
    estimateBeneficiaries: number,
    preliminaryCharacterization: string,
    coverage: number,
    referencePopulation: string,
    denomination: string,
}

export interface criterio4 {
    availableTerrain: boolean,
    oneAvailableTerrain: boolean,
    investPurchase: boolean,
}

export interface criterio5 {
    registerGovernmentTerrain: boolean,
    statusDescribe: string,
}

export interface criterio6 {
    projectType: string,
    formulationProcess: string,
    descriptionInterventions: string,
    complexity: string,
}