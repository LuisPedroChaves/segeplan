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
    registerCode: string;
    correlation: number;
    planningInstrument: boolean;
    description: string;
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
    responsibleName: string;
    email: string;
    phone: string;
    dateOut?: Date;
    punctuation?: number;
    state?: boolean;
    stage?: Stage;
    ProblemDefinition?: ProblemDefinition;
    PreliminaryDefinition?: PreliminaryDefinition;
    Qualification?: Qualification;
}
