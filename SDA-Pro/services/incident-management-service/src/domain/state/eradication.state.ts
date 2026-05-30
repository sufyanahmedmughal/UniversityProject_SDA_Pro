// PATTERN: State — EradicationState
import { IncidentState } from './incident-state.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';
import { InvalidStateTransitionError } from '../../../../../shared/commons/errors';

export class EradicationState implements IncidentState {
    getName(): string { return 'ERADICATION'; }

    getAllowedActions(): ResponseActionType[] {
        return [
            ResponseActionType.QUARANTINE_FILE,
            ResponseActionType.DISABLE_USER,
        ];
    }

    beginTriage(): void { throw new InvalidStateTransitionError('ERADICATION', 'TRIAGE'); }
    initiateContainment(): void { throw new InvalidStateTransitionError('ERADICATION', 'CONTAINMENT'); }
    beginEradication(): void { throw new InvalidStateTransitionError('ERADICATION', 'ERADICATION'); }

    beginRecovery(incident: any): void {
        console.log('[EradicationState] Moving to RECOVERY');
        const { RecoveryState } = require('./recovery.state');
        incident.setState(new RecoveryState());
    }

    beginPostReview(): void { throw new InvalidStateTransitionError('ERADICATION', 'POST_REVIEW'); }
    close(): void { throw new InvalidStateTransitionError('ERADICATION', 'CLOSED'); }
    escalate(incident: any, reason: string): void {
        console.log(`[EradicationState] Escalated: ${reason}`);
    }
}