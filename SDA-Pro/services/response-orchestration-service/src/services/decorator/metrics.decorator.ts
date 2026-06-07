// PATTERN: Decorator — Metrics Collection
import { ResponseActionDecorator } from './response-action.decorator';
import { ActionOutcome } from './response-action.interface';

export class MetricsDecorator extends ResponseActionDecorator {
    async execute(targetIP: string): Promise<ActionOutcome> {
        const start = Date.now();
        const outcome = await super.execute(targetIP);
        const duration = Date.now() - start;
        console.log(`[MetricsDecorator] ${this.getType()} took ${duration}ms — success=${outcome.success}`);
        return outcome;
    }
}