// PATTERN: State — RecoveryState
import { IncidentState } from './incident-state.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';
import { InvalidStateTransitionError } from '../../../../../shared/commons/errors';

export class RecoveryState implements IncidentState {
    getName(): string { return 'RECOVERY'; }
    getAllowedActions(): ResponseActionType[] { return []; }

    beginTriage(): void { throw new InvalidStateTransitionError('RECOVERY', 'TRIAGE'); }
    initiateContainment(): void { throw new InvalidStateTransitionError('RECOVERY', 'CONTAINMENT'); }
    beginEradication(): void { throw new InvalidStateTransitionError('RECOVERY', 'ERADICATION'); }
    beginRecovery(): void { throw new InvalidStateTransitionError('RECOVERY', 'RECOVERY'); }

    beginPostReview(incident: any): void {
        console.log('[RecoveryState] Moving to POST_INCIDENT_REVIEW');
        const { PostIncidentReviewState } = require('./post-incident-review.state');
        incident.setState(new PostIncidentReviewState());
    }

    close(): void { throw new InvalidStateTransitionError('RECOVERY', 'CLOSED'); }
    escalate(incident: any, reason: string): void {
        console.log(`[RecoveryState] Escalated: ${reason}`);
    }
}