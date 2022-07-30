import { SectionBI } from "./section";

export interface GeneralInformationSend {
    codigo?: string;
    sectionBI: string;
    productId: string; //Setear valor quemado
    productName: string; //Setear valor quemado
    date: Date;
    registerCode: string;
    planningInstrument: boolean;
    description: string;
}

export interface GeneralInformation {
    codigo?: string;
    sectionBI: string;
    productId: string; //Setear valor quemado
    productName: string; //Setear valor quemado
    date: Date;
    registerCode: string;
    planningInstrument: boolean;
    description: string;
	_sectionBI: SectionBI;
}
