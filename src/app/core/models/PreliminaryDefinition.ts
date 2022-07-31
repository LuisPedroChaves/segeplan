import { PossibleAlternative } from "./PossibleAlternative";

export interface PreliminaryDefinition {
    codigo?: string;
    generalObjective: string;
    expectedChange: string;
    possibleAlternatives: PossibleAlternative[];
}

