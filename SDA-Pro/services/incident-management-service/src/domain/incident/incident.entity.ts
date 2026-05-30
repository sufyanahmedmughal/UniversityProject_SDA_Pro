// PATTERN: State — Context class
import { IncidentState } from '../state/incident-state.interface';
import { NewState } from '../state/new.state';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';
import { v4 as uuidv4 } from 'uuid';

export class Incident {
    private id: string;
    private currentState: IncidentState;
    private affectedAlertIds: string[];
    private severity: string;
    assignedAnalystId?: string;
    plannedActions?: ResponseActionType[];
    private createdAt: string;
    private updatedAt: string;

    constructor(alertIds: string[], severity: string) {
        this.id = uuidv4();
        this.affectedAlertIds = alertIds;
        this.severity = severity;
        this.currentState = new NewState(); // starts in NEW
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    setState(state: IncidentState): void {
        console.log(`[Incident] ${this.currentState.getName()} → ${state.getName()}`);
        this.currentState = state;
        this.updatedAt = new Date().toISOString();
    }

    getState(): IncidentState { return this.currentState; }
    getStateName(): string { return this.currentState.getName(); }
    getId(): string { return this.id; }
    getSeverity(): string { return this.severity; }
    getAlertIds(): string[] { return this.affectedAlertIds; }
    getCreatedAt(): string { return this.createdAt; }

    // Delegate to current state
    beginTriage(analystId: string): void {
        this.currentState.beginTriage(this, analystId);
    }
    initiateContainment(actions: ResponseActionType[]): void {
        this.currentState.initiateContainment(this, actions);
    }
    beginEradication(): void { this.currentState.beginEradication(this); }
    beginRecovery(): void { this.currentState.beginRecovery(this); }
    beginPostReview(): void { this.currentState.beginPostReview(this); }
    close(): void { this.currentState.close(this); }
    escalate(reason: string): void { this.currentState.escalate(this, reason); }

    toDTO() {
        return {
            id: this.id,
            state: this.currentState.getName(),
            severity: this.severity,
            affectedAlertIds: this.affectedAlertIds,
            assignedAnalystId: this.assignedAnalystId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}