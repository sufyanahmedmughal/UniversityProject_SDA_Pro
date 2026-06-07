// PATTERN: State — NewState
import { IncidentState } from './incident-state.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';
import { InvalidStateTransitionError } from '../../../../../shared/commons/errors';

export class NewState implements IncidentState {
    getName(): string { return 'NEW'; }

    getAllowedActions(): ResponseActionType[] {
        return [ResponseActionType.ESCALATE];
    }

    beginTriage(incident: any, analystId: string): void {
        console.log(`[NewState] Transitioning to UNDER_TRIAGE, analyst: ${analystId}`);
        incident.assignedAnalystId = analystId;
        const { UnderTriageState } = require('./under-triage.state');
        incident.setState(new UnderTriageState());
    }

    initiateContainment(): void {
        throw new InvalidStateTransitionError('NEW', 'CONTAINMENT');
    }
    beginEradication(): void {
        throw new InvalidStateTransitionError('NEW', 'ERADICATION');
    }
    beginRecovery(): void {
        throw new InvalidStateTransitionError('NEW', 'RECOVERY');
    }
    beginPostReview(): void {
        throw new InvalidStateTransitionError('NEW', 'POST_REVIEW');
    }
    close(): void {
        throw new InvalidStateTransitionError('NEW', 'CLOSED');
    }
    escalate(incident: any, reason: string): void {
        console.log(`[NewState] Escalated: ${reason}`);
    }
}