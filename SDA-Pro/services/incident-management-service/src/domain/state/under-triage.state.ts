// PATTERN: State — UnderTriageState
import { IncidentState } from './incident-state.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';
import { InvalidStateTransitionError } from '../../../../../shared/commons/errors';

export class UnderTriageState implements IncidentState {
    getName(): string { return 'UNDER_TRIAGE'; }

    getAllowedActions(): ResponseActionType[] {
        return [
            ResponseActionType.BLOCK_IP,
            ResponseActionType.DISABLE_USER,
            ResponseActionType.ESCALATE,
        ];
    }

    beginTriage(): void {
        throw new InvalidStateTransitionError('UNDER_TRIAGE', 'UNDER_TRIAGE');
    }

    initiateContainment(incident: any, actions: ResponseActionType[]): void {
        console.log(`[UnderTriageState] Moving to CONTAINMENT with actions: ${actions}`);
        incident.plannedActions = actions;
        const { ContainmentState } = require('./containment.state');
        incident.setState(new ContainmentState());
    }

    beginEradication(): void {
        throw new InvalidStateTransitionError('UNDER_TRIAGE', 'ERADICATION');
    }
    beginRecovery(): void {
        throw new InvalidStateTransitionError('UNDER_TRIAGE', 'RECOVERY');
    }
    beginPostReview(): void {
        throw new InvalidStateTransitionError('UNDER_TRIAGE', 'POST_REVIEW');
    }
    close(): void {
        throw new InvalidStateTransitionError('UNDER_TRIAGE', 'CLOSED');
    }
    escalate(incident: any, reason: string): void {
        console.log(`[UnderTriageState] Escalated: ${reason}`);
    }
}