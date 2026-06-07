// PATTERN: Decorator — Component interface
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';

export interface ActionOutcome {
    success: boolean;
    actionType: ResponseActionType;
    details: string;
    executedAt: string;
}

export interface ResponseAction {
    execute(targetIP: string): Promise<ActionOutcome>;
    getType(): ResponseActionType;
    isReversible(): boolean;
    rollback(targetIP: string): Promise<void>;
}