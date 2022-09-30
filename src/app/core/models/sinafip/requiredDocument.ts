import { EstimatedBudget } from "./estimatedBudget";

export interface RequiredDocument {
    id?: string;
    tdr?: string;
    scheduleActiv?: string;
    stimatedBudget?: EstimatedBudget;
    requestId?: string;
}
