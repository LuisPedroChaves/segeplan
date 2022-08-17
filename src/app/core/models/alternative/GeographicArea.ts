import { Coordinates } from "./Coordinates";

export interface GeographicArea {
    codigo?: string;
    AlternativeId?: string;
    availableTerrain: boolean;
    oneAvailableTerrain: boolean;
    investPurchase: boolean;
    governmentTerrain: boolean;
    registerGovernmentTerrain: boolean;
    statusDescribe: string;
    finca: string;
    folio: string;
    libro: string;
    plano: boolean;
    slightIncline: boolean;
    broken: boolean;
    image?: string;
    imageUrl?: string;
    description: string;
    basicServices: boolean;
    descriptionBasicServices: string;
    descriptionLocation: string;
    coordinates: Coordinates[];
}
