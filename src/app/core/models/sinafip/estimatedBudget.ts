import { Activity } from "./activity";

export interface EstimatedBudget {
    id?: string;
    totalStimated?: number;
    activities?:Activity[]
}
