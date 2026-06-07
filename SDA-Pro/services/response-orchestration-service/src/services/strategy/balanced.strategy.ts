// PATTERN: Strategy — BalancedResponseStrategy
import { ResponseStrategy, ResponseContext } from './response-strategy.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';

export class BalancedResponseStrategy implements ResponseStrategy {
    getName(): string { return 'BalancedResponse'; }

    determineActions(context: ResponseContext): ResponseActionType[] {
        console.log(`[BalancedStrategy] Asset criticality=${context.assetCriticality}`);
        return [
            ResponseActionType.BLOCK_IP,
            ResponseActionType.QUARANTINE_FILE,
        ];
    }
}