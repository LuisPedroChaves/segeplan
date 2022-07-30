import { GeneralInformation } from "./GeneralInformation";

export interface Idea {
    codigo?: string;
    name: string;
    state: boolean; //Setear valor quemado
    _sectionBI: SectionBI;
  }

export interface SectionBI{
    codigo: string;
    IdeaId: string;
    name: string;
    dateFinished: Date;
    punctuation: number;
    state: boolean; 
    _generalInformation: GeneralInformation;
}
  