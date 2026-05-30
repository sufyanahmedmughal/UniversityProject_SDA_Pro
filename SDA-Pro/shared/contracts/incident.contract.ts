export enum IncidentState {
    NEW = 'NEW',
    UNDER_TRIAGE = 'UNDER_TRIAGE',
    CONTAINMENT = 'CONTAINMENT',
    ERADICATION = 'ERADICATION',
    RECOVERY = 'RECOVERY',
    POST_INCIDENT_REVIEW = 'POST_INCIDENT_REVIEW',
    CLOSED = 'CLOSED',
}

export enum ResponseActionType {
    ISOLATE_ENDPOINT = 'ISOLATE_ENDPOINT',
    BLOCK_IP = 'BLOCK_IP',
    DISABLE_USER = 'DISABLE_USER',
    QUARANTINE_FILE = 'QUARANTINE_FILE',
    ESCALATE = 'ESCALATE',
}

export interface IncidentDTO {
    id: string;
    state: IncidentState;
    severity: string;
    affectedAlertIds: string[];
    assignedAnalystId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ActionOutcome {
    actionType: ResponseActionType;
    success: boolean;
    executedAt: string;
    details: string;
}