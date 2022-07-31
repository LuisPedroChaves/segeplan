import { DataProponent } from "./DataProponent";
import { PreliminaryDefinition } from "./PreliminaryDefinition";
import { ProblemDefinition } from "./ProblemDefinition";
import { Qualification } from "./Qyualification";
import { Stage } from "./Stage";

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
    date: Date;
    correlation: number;
    registerCode: string;
    planningInstrument: boolean;
    description: string;
    dateOut: Date;
    punctuation: number;
    state: boolean;
    stage: Stage;
    DataProponent: DataProponent;
    ProblemDefinition: ProblemDefinition;
    PreliminaryDefinition: PreliminaryDefinition;
    Qualification: Qualification;
}
