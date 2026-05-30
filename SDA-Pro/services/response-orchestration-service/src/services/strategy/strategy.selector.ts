// PATTERN: Strategy — Selector
import { ResponseStrategy, ResponseContext } from './response-strategy.interface';
import { AggressiveContainmentStrategy } from './aggressive.strategy';
import { BalancedResponseStrategy } from './balanced.strategy';
import { ConservativeStrategy } from './conservative.strategy';
import { WatchAndWaitStrategy } from './watch-and-wait.strategy';

export class ResponseStrategySelector {
    select(context: ResponseContext): ResponseStrategy {
        const { severity, assetCriticality } = context;

        if (severity === 'CRITICAL' && assetCriticality === 'HIGH') {
            return new AggressiveContainmentStrategy();
        }
        if (severity === 'HIGH') {
            return new BalancedResponseStrategy();
        }
        if (severity === 'MEDIUM') {
            return new ConservativeStrategy();
        }
        return new WatchAndWaitStrategy();
    }
}