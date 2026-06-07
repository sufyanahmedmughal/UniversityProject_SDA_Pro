// PATTERN: State — PostIncidentReviewState
import { IncidentState } from './incident-state.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';
import { InvalidStateTransitionError } from '../../../../../shared/commons/errors';

export class PostIncidentReviewState implements IncidentState {
    getName(): string { return 'POST_INCIDENT_REVIEW'; }
    getAllowedActions(): ResponseActionType[] { return []; }

    beginTriage(): void { throw new InvalidStateTransitionError('POST_REVIEW', 'TRIAGE'); }
    initiateContainment(): void { throw new InvalidStateTransitionError('POST_REVIEW', 'CONTAINMENT'); }
    beginEradication(): void { throw new InvalidStateTransitionError('POST_REVIEW', 'ERADICATION'); }
    beginRecovery(): void { throw new InvalidStateTransitionError('POST_REVIEW', 'RECOVERY'); }
    beginPostReview(): void { throw new InvalidStateTransitionError('POST_REVIEW', 'POST_REVIEW'); }

    close(incident: any): void {
        console.log('[PostIncidentReviewState] Closing incident');
        const { ClosedState } = require('./closed.state');
        incident.setState(new ClosedState());
    }

    escalate(incident: any, reason: string): void {
        console.log(`[PostReviewState] Escalated: ${reason}`);
    }
}