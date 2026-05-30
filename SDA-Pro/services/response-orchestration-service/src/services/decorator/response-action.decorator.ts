// PATTERN: Decorator — Abstract Decorator
import { ResponseAction, ActionOutcome } from './response-action.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';

export abstract class ResponseActionDecorator implements ResponseAction {
    constructor(protected wrappedAction: ResponseAction) { }

    getType(): ResponseActionType { return this.wrappedAction.getType(); }
    isReversible(): boolean { return this.wrappedAction.isReversible(); }

    async execute(targetIP: string): Promise<ActionOutcome> {
        return this.wrappedAction.execute(targetIP);
    }

    async rollback(targetIP: string): Promise<void> {
        return this.wrappedAction.rollback(targetIP);
    }
}