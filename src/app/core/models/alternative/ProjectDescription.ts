import { ExecutionTime } from "./ExecutionTime";

export interface ProjectDescription {
    codigo?: string;
    AlternativeId?: string;
    projectType: string;
    formulationProcess: string;
    formulationProcessDescription: string;
    descriptionInterventions: string;
    complexity: string;
    estimatedCost: number;
    investmentCost: number;
    fundingSources: number;
    foundingSourcesName: string;
    executionTime: ExecutionTime;
}
