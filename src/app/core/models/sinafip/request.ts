import { Institution } from "./institution";
import { InvestmentProject } from './investmentProject';
import { RequiredDocument } from "./requiredDocument";
import { StudyDescription } from "./studyDescription";
import { Delimit } from './delimit';

export interface Request {
    id?: string;
    result?: string;
    status?: string;
    author?: string;
    advser?: string;
    reviewd?: string;
    created?: string;
    institutionInfo: Institution;
    investment: InvestmentProject;
    studyDescriptionInfo: StudyDescription;
    requirementsDocuments: RequiredDocument;
    delimitInfo: Delimit
}
