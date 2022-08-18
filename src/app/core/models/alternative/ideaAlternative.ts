import { GeographicArea } from "./GeographicArea";
import { PopulationDelimitation } from "./PopulationDelimitation";
import { PreliminaryName } from "./PreliminaryName";
import { ProjectDescription } from "./ProjectDescription";
import { ResponsibleEntity } from "./ResponsibleEntity";

export interface IdeaAlternative {
    codigo?: string;
    sectionBIId: string;
    state?: boolean;
    preName: PreliminaryName;
    resEntity: ResponsibleEntity;
    popDelimit: PopulationDelimitation;
    geoArea: GeographicArea;
    projDesc: ProjectDescription;
}
