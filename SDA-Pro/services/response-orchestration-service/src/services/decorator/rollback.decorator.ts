// PATTERN: Decorator — Rollback Capability
import { ResponseActionDecorator } from './response-action.decorator';
import { ActionOutcome } from './response-action.interface';

export class RollbackDecorator extends ResponseActionDecorator {
    async execute(targetIP: string): Promise<ActionOutcome> {
        try {
            const outcome = await super.execute(targetIP);
            if (!outcome.success && this.isReversible()) {
                console.log(`[RollbackDecorator] Action failed — initiating rollback`);
                await this.rollback(targetIP);
            }
            return outcome;
        } catch (err) {
            console.error(`[RollbackDecorator] Error — rolling back`);
            await this.rollback(targetIP);
            throw err;
        }
    }
}