export interface DataGeo {
    id?: string;
    geoAreaId?: string;
    //Sutuacion Legal del posible bien
    governmentTerrain: boolean;
    registerGovernmentTerrain: boolean;
    statusDescribe: string;
    finca: string;
    folio: string;
    libro: string;

    // Caracteristicas del posible terreno
    plano: boolean;
    slightIncline: boolean;
    broken: boolean;
    image?: string;
    imageUrl?: string;
    description: string;

    // Servicios Basicos
    basicServices: boolean;
    descriptionBasicServices: string;

    // Coordenadas
    degreesx: string;
    minutesx: string;
    secondsx: string;
    degreesy: string;
    minutesy: string;
    secondsy: string;
    descriptionLocation: string;
}
