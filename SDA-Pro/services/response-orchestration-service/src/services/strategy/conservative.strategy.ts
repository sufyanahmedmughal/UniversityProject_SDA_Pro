// PATTERN: Strategy — ConservativeStrategy
import { ResponseStrategy, ResponseContext } from './response-strategy.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';

export class ConservativeStrategy implements ResponseStrategy {
    getName(): string { return 'Conservative'; }

    determineActions(_context: ResponseContext): ResponseActionType[] {
        return [ResponseActionType.BLOCK_IP];
    }
}