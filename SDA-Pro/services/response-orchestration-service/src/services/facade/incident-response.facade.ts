// PATTERN: Facade — simplifies complex response subsystem
import { ResponseStrategySelector } from '../strategy/strategy.selector';
import { ResponseContext } from '../strategy/response-strategy.interface';
import { BlockIPAction, IsolateEndpointAction, DisableUserAction } from '../decorator/concrete-actions';
import { AuditLogDecorator } from '../decorator/audit-log.decorator';
import { ApprovalGateDecorator } from '../decorator/approval-gate.decorator';
import { RollbackDecorator } from '../decorator/rollback.decorator';
import { MetricsDecorator } from '../decorator/metrics.decorator';
import { ResponseAction, ActionOutcome } from '../decorator/response-action.interface';
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';

export class IncidentResponseFacade {
    // PATTERN: Facade — single entry point for all response operations
    private strategySelector = new ResponseStrategySelector();

    async assessAndRespond(
        incidentId: string,
        severity: string,
        assetCriticality: string,
        targetIP: string,
    ): Promise<ActionOutcome[]> {
        console.log(`[Facade] Starting response for incident: ${incidentId}`);

        // 1. Select strategy
        const context: ResponseContext = {
            incidentId,
            severity,
            assetCriticality,
            affectedAssetCount: 1,
        };
        const strategy = this.strategySelector.select(context);
        console.log(`[Facade] Strategy selected: ${strategy.getName()}`);

        // 2. Determine actions
        const actionTypes = strategy.determineActions(context);

        // 3. Execute each action through decorator chain
        const outcomes: ActionOutcome[] = [];
        for (const actionType of actionTypes) {
            const action = this.buildDecoratedAction(actionType);
            if (action) {
                const outcome = await action.execute(targetIP);
                outcomes.push(outcome);
            }
        }

        return outcomes;
    }

    // PATTERN: Decorator — wraps each action with audit + approval + rollback + metrics
    private buildDecoratedAction(type: ResponseActionType): ResponseAction | null {
        let base: ResponseAction;

        if (type === ResponseActionType.BLOCK_IP) base = new BlockIPAction();
        else if (type === ResponseActionType.ISOLATE_ENDPOINT) base = new IsolateEndpointAction();
        else if (type === ResponseActionType.DISABLE_USER) base = new DisableUserAction();
        else return null;

        // Wrap in decorator chain: Metrics → Approval → Audit → Base
        return new MetricsDecorator(
            new ApprovalGateDecorator(
                new AuditLogDecorator(
                    new RollbackDecorator(base)
                )
            )
        );
    }
}