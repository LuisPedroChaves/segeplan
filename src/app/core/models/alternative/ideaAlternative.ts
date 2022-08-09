import { GeographicArea } from "./geographicArea";
import { PopulationDelimitation } from "./PopulationDelimitation";
import { PreliminaryName } from "./PreliminaryName";
import { ProjectDescription } from "./ProjectDescription";
import { ResponsibleEntity } from "./ResponsibleEntity";

export interface IdeaAlternative {
    codigo?: string;
    sectionBIId: string;
    state?: boolean;
    preliminaryName: PreliminaryName;
    responsibleEntity: ResponsibleEntity;
    populationDelimitation: PopulationDelimitation;
    geographicArea: GeographicArea;
    projectDescription: ProjectDescription;
}

