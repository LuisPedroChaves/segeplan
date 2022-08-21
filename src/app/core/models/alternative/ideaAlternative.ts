import { GeographicArea } from "./GeographicArea";
import { PopulationDelimitation } from "./PopulationDelimitation";
import { PreliminaryName } from "./PreliminaryName";
import { ProjectDescription } from "./ProjectDescription";
import { ResponsibleEntity } from "./ResponsibleEntity";
import { Qualification } from './Qyualification';
import { preInvestment } from "./preInvestment";

export interface IdeaAlternative {
    codigo?: string;
    sectionBIId: string;
    state?: string;
    preName: PreliminaryName;
    resEntity: ResponsibleEntity;
    popDelimit: PopulationDelimitation;
    geoArea: GeographicArea;
    projDesc: ProjectDescription;
    qualification?: Qualification;
    preInvestment?: preInvestment;
}
