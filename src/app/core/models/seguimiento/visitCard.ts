import { IAccessRoads } from './accessRoads';
import { IDisasters } from './disasters';
import { IImgVisit } from './imgVisit';
import { IMeansTransport } from './meansTransport';
import { IServiceInf } from './serviceInf';
import { IThreatTypes } from './threatTypes';
export interface IVisitCard {
    id?: string;
    trackId?: string;
    codePreinv: string;
    visitDate: string;
    deptoDel: string;
    specialistName: string;
    proposalName: string;
    mountAprox: number;
    region: number;
    depto: string;
    municip: string;
    address: string;
    typeAddress: boolean;
    catLocation: string;
    typeClimate: string;
    avgTemperature: string;
    distanceKm: string;
    nameHeadboard: string;
    isDrinkingWater: boolean;
    isDrainageNetwork: boolean;
    isElectricity: boolean;
    isPhoneService: boolean;
    isDrinkableWhater: boolean;
    garbageDisposal: string;
    latitud: string;
    longitud: string;
    gtmx: string;
    gtmy: string;
    elevation: string;
    msnm: string;
    infRealEstate: string;
    groundConditions: string;
    approximateSlope: number;
    soilType: string;
    realEstateArea: number;
    northMeasure: number;
    southMeasure: number;
    eastMeasure: number;
    westMeasure: number;
    northBorder: string;
    southBorder: string;
    eastBorder: string;
    westBorder: string;
    legalSituation: string;
    basicServRS: string;
    isElectricityRS: boolean;
    isPhoneRS: boolean;
    isDrainageRS: boolean;
    isDrinkingWRS: boolean;
    garbageRS: boolean;
    isReqFinance: boolean;
    desReqFinance: string;
    appStatus: string;
    techNameEpi: string;
    techPosEpi: string;
    techProfEpi: string;

    accessRoads: IAccessRoads[];
    meanstransport: IMeansTransport[];
    serviceInf: IServiceInf[];
    disasters: IDisasters[];
    threatTypes: IThreatTypes[];
    imgVisit: IImgVisit[];

}
