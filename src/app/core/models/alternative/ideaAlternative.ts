import { GeographicArea } from "./GeographicArea";
import { PopulationDelimitation } from "./PopulationDelimitation";
import { PreliminaryName } from "./PreliminaryName";
import { ProjectDescription } from "./ProjectDescription";
import { ResponsibleEntity } from "./ResponsibleEntity";
import { Qualification } from './Qyualification';
import { preInvestment } from "./preInvestment";
import { Denomination } from "./Denomination";

export interface IdeaAlternative {
    codigo?: string;
    sectionBIId: string;
    state?: string;
    preName: PreliminaryName;
    resEntity: ResponsibleEntity;
    popDelimit: PopulationDelimitation;
    popDelimitdenmtion?: Denomination;
    geoArea: GeographicArea;
    projDesc: ProjectDescription;
    qualification?: Qualification;
    preInvestment?: preInvestment;
}
