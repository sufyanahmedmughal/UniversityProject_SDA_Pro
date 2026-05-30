// PATTERN: Strategy — WatchAndWaitStrategy
import { ResponseStrategy, ResponseContext } from './response-strategy.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';

export class WatchAndWaitStrategy implements ResponseStrategy {
    getName(): string { return 'WatchAndWait'; }

    determineActions(_context: ResponseContext): ResponseActionType[] {
        console.log('[WatchAndWaitStrategy] Monitoring only — no active response');
        return [ResponseActionType.ESCALATE];
    }
}