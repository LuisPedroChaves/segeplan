import { PreliminaryDefinition } from "./PreliminaryDefinition";
import { ProblemDefinition } from "./ProblemDefinition";
import { Qualification } from "./Qyualification";
import { Stage } from "./Stage";
import * as moment from 'moment';


export interface GeneralInformationSend {
    codigo?: string;
    productId: string; //Setear valor quemado
    productName: string; //Setear valor quemado
    date: Date;
    planningInstrument: boolean;
    description?: string;
    idEntity: string;
    nameEntity: string;
    responsibleName: string;
    email: string;
    phone: string;
}

export interface GeneralInformation {
    codigo?: string;
    productId: string; //Setear valor quemado
    productName: string; //Setear valor quemado
    date?: any;
    correlation?: number;
    registerCode?: string;
    planningInstrument: boolean;
    description: string;
    dateOut: Date;
    punctuation: number;
    state: boolean;
    idEntity: string;
    nameEntity: string;
    responsibleName: string;
    email: string;
    phone: string;
    stage: Stage;
    ProblemDefinition: ProblemDefinition;
    PreliminaryDefinition: PreliminaryDefinition;
    Qualification: Qualification;
}
