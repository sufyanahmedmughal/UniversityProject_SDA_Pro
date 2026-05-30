// PATTERN: State — ClosedState (terminal)
import { IncidentState } from './incident-state.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';
import { InvalidStateTransitionError } from '../../../../../shared/commons/errors';

export class ClosedState implements IncidentState {
    getName(): string { return 'CLOSED'; }
    getAllowedActions(): ResponseActionType[] { return []; }

    beginTriage(): void { throw new InvalidStateTransitionError('CLOSED', 'TRIAGE'); }
    initiateContainment(): void { throw new InvalidStateTransitionError('CLOSED', 'CONTAINMENT'); }
    beginEradication(): void { throw new InvalidStateTransitionError('CLOSED', 'ERADICATION'); }
    beginRecovery(): void { throw new InvalidStateTransitionError('CLOSED', 'RECOVERY'); }
    beginPostReview(): void { throw new InvalidStateTransitionError('CLOSED', 'POST_REVIEW'); }
    close(): void { throw new InvalidStateTransitionError('CLOSED', 'CLOSED'); }
    escalate(): void { throw new InvalidStateTransitionError('CLOSED', 'ESCALATE'); }
}