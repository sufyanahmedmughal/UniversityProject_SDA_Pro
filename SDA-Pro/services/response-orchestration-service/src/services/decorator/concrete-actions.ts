// PATTERN: Decorator — Concrete Components
import { ResponseAction, ActionOutcome } from './response-action.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';

export class BlockIPAction implements ResponseAction {
    getType(): ResponseActionType { return ResponseActionType.BLOCK_IP; }
    isReversible(): boolean { return true; }

    async execute(targetIP: string): Promise<ActionOutcome> {
        // Real impl: call firewall API
        console.log(`[BlockIPAction] Blocking IP: ${targetIP}`);
        return {
            success: true,
            actionType: ResponseActionType.BLOCK_IP,
            details: `IP ${targetIP} blocked successfully`,
            executedAt: new Date().toISOString(),
        };
    }

    async rollback(targetIP: string): Promise<void> {
        console.log(`[BlockIPAction] Unblocking IP: ${targetIP}`);
    }
}

export class IsolateEndpointAction implements ResponseAction {
    getType(): ResponseActionType { return ResponseActionType.ISOLATE_ENDPOINT; }
    isReversible(): boolean { return true; }

    async execute(targetIP: string): Promise<ActionOutcome> {
        console.log(`[IsolateEndpointAction] Isolating endpoint: ${targetIP}`);
        return {
            success: true,
            actionType: ResponseActionType.ISOLATE_ENDPOINT,
            details: `Endpoint ${targetIP} isolated`,
            executedAt: new Date().toISOString(),
        };
    }

    async rollback(targetIP: string): Promise<void> {
        console.log(`[IsolateEndpointAction] Restoring endpoint: ${targetIP}`);
    }
}

export class DisableUserAction implements ResponseAction {
    getType(): ResponseActionType { return ResponseActionType.DISABLE_USER; }
    isReversible(): boolean { return true; }

    async execute(targetIP: string): Promise<ActionOutcome> {
        console.log(`[DisableUserAction] Disabling user account: ${targetIP}`);
        return {
            success: true,
            actionType: ResponseActionType.DISABLE_USER,
            details: `User ${targetIP} disabled`,
            executedAt: new Date().toISOString(),
        };
    }

    async rollback(targetIP: string): Promise<void> {
        console.log(`[DisableUserAction] Re-enabling user: ${targetIP}`);
    }
}