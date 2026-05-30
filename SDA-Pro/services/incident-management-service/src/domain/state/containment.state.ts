// PATTERN: State — ContainmentState
import { IncidentState } from './incident-state.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';
import { InvalidStateTransitionError } from '../../../../../shared/commons/errors';

export class ContainmentState implements IncidentState {
    getName(): string { return 'CONTAINMENT'; }

    getAllowedActions(): ResponseActionType[] {
        return [
            ResponseActionType.ISOLATE_ENDPOINT,
            ResponseActionType.BLOCK_IP,
            ResponseActionType.QUARANTINE_FILE,
            ResponseActionType.ESCALATE,
        ];
    }

    beginTriage(): void {
        throw new InvalidStateTransitionError('CONTAINMENT', 'UNDER_TRIAGE');
    }
    initiateContainment(): void {
        throw new InvalidStateTransitionError('CONTAINMENT', 'CONTAINMENT');
    }

    beginEradication(incident: any): void {
        console.log('[ContainmentState] Moving to ERADICATION');
        const { EradicationState } = require('./eradication.state');
        incident.setState(new EradicationState());
    }

    beginRecovery(): void {
        throw new InvalidStateTransitionError('CONTAINMENT', 'RECOVERY');
    }
    beginPostReview(): void {
        throw new InvalidStateTransitionError('CONTAINMENT', 'POST_REVIEW');
    }
    close(): void {
        throw new InvalidStateTransitionError('CONTAINMENT', 'CLOSED');
    }
    escalate(incident: any, reason: string): void {
        console.log(`[ContainmentState] Escalated: ${reason}`);
    }
}