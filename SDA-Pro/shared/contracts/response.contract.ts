import { ResponseActionType, ActionOutcome } from './incident.contract';

export interface ResponsePlan {
    incidentId: string;
    strategy: string;
    actions: ResponseActionType[];
    createdAt: string;
}

export interface ExecutionResult {
    incidentId: string;
    outcomes: ActionOutcome[];
    allSuccessful: boolean;
}