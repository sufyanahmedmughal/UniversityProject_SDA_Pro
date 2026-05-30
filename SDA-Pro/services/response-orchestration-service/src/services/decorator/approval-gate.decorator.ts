// PATTERN: Decorator — Approval Gate
import { ResponseActionDecorator } from './response-action.decorator';
import { ActionOutcome } from './response-action.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';

export class ApprovalGateDecorator extends ResponseActionDecorator {
    // Actions that need approval
    private requiresApproval = [
        ResponseActionType.DISABLE_USER,
        ResponseActionType.ISOLATE_ENDPOINT,
    ];

    async execute(targetIP: string): Promise<ActionOutcome> {
        if (this.requiresApproval.includes(this.getType())) {
            const approved = await this.checkApproval();
            if (!approved) {
                return {
                    success: false,
                    actionType: this.getType(),
                    details: 'Action rejected — approval denied',
                    executedAt: new Date().toISOString(),
                };
            }
            console.log(`[ApprovalGateDecorator] Approval GRANTED for ${this.getType()}`);
        }
        return super.execute(targetIP);
    }

    private async checkApproval(): Promise<boolean> {
        // Mock: auto-approve. Real impl: call approval service
        return true;
    }
}