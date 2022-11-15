import { IComment } from "./comment";

export interface IAdvisoryDoc {
    id?: string;
    trackId?: string;
    goal: string;
    action: string;
    entity: string;
    advTheme: string;
    snipCode: string;
    projectName: string;
    participant: string;
    analysisDate: string;
    advDate: string;
    assistant: string;
    conclusions: string;
    recomend: string;
    comments: IComment[];
}
