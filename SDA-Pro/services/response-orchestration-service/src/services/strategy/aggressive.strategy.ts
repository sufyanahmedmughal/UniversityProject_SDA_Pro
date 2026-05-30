// PATTERN: Strategy — AggressiveContainmentStrategy
import { ResponseStrategy, ResponseContext } from './response-strategy.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';

export class AggressiveContainmentStrategy implements ResponseStrategy {
    getName(): string { return 'AggressiveContainment'; }

    determineActions(context: ResponseContext): ResponseActionType[] {
        console.log(`[AggressiveStrategy] Severity=${context.severity}`);
        return [
            ResponseActionType.ISOLATE_ENDPOINT,
            ResponseActionType.BLOCK_IP,
            ResponseActionType.DISABLE_USER,
            ResponseActionType.QUARANTINE_FILE,
        ];
    }
}
