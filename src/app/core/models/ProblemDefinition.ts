import { PossibleEffect } from "./PossibleEffect";
import { PossibleCause } from './PossibleCause';

export interface ProblemDefinition {
    codigo?: string;
    generalInformationId: string;
    definitionPotentiality: string;
    baseLine: string;
    description: string;
    possibleEffects: PossibleEffect[];
    possibleCauses: PossibleCause[];
}

