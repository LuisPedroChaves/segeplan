import { Stage } from "./Stage";
import * as moment from 'moment';
import { PossibleAlternative } from "./PossibleAlternative";
import { PossibleEffect } from "./PossibleEffect";
import { PossibleCause } from "./PossibleCause";
import { IdeaAlternative } from "../alternative/ideaAlternative";

export interface GeneralInformation {
    codigo?: string;
    idStage?: string;
    productId: string; //Setear valor quemado
    productName: string; //Setear valor quemado
    date: moment.Moment | Date | string;
    correlation?: number;
    registerCode?: string;
    planningInstrument: boolean;
    description: string;
    dateOut?: Date;
    punctuation?: number;
    state?: string;
    idEntity?: string;
    nameEntity?: string;
    responsibleName: string;
    email: string;
    phone: string;
    definitionPotentiality: string,
    baseLine: string,
    descriptionCurrentSituation: string;
    result?: string;

    generalObjective: string;
    expectedChange: string;

    Effects: PossibleEffect[];
    Causes: PossibleCause[];
    Alternatives: PossibleAlternative[];
    stage?: Stage;

    createdAt?: string;
    alternatives: IdeaAlternative[];

    author?: string;
    analizer?: string;
}
