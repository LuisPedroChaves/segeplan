import { DataGeo } from "./DataGeo";

export interface GeographicArea {
    codigo?: string;
    AlterId?: string;
    availableTerrain: boolean;
    oneAvailableTerrain: boolean;
    investPurchase: boolean;
    dataGeo?: DataGeo[];
}
