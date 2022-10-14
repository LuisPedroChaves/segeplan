export interface AdmissionQuanty {
    id?: string;
    statementNeed: string;
    statementNeedDescription?: string;
    statementNeedValue: number;
    numberBeneficiaries: string;
    numberBeneficiariesDescription?: string;
    numberBeneficiariesValue: number;
    objetivesGoals: string;
    objetivesGoalsDescription?: string;
    objetivesGoalsValue: number;
    tdr: string;
    tdrDescription?: string;
    tdrValue: number;
    estimatedCost: string;
    estimatedCostDescription?: string;
    estimatedCostValue: number;
    generalSchedule: string;
    generalScheduleDescription?: string;
    generalScheduleValue: number;
    total: number;
    requestId?: string;
}
