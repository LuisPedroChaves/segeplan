import { ExecutionTime } from "./ExecutionTime";

export interface ProjectDescription {
    codigo?: string;
    ideaAlternativeId?: string;
    formulationProcess: string;
    projectType: string;
    complexity: string;
    descriptionInterventions: string;
    estimatedCost: number;
    investmentCost: number;
    fundingSources: number;
    foundingSourcesName: string;
    executionTime: ExecutionTime;
}
