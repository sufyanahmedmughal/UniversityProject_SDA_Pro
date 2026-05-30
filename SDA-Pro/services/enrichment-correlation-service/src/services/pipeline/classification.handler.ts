// PATTERN: Chain of Responsibility — Handler 5
import { EnrichmentHandler, EnrichmentResult } from './enrichment-handler.abstract';
import { AlertComponent } from '../../domain/composite/alert-component.interface';
import { Severity } from '../../../../../shared/contracts/alert.contract';

export class ClassificationHandler extends EnrichmentHandler {
    protected async doEnrich(alert: AlertComponent): Promise<EnrichmentResult> {
        const severity = alert.getSeverity();
        let classification = 'INFORMATIONAL';

        if (severity === Severity.CRITICAL) classification = 'TRUE_POSITIVE_CRITICAL';
        else if (severity === Severity.HIGH) classification = 'TRUE_POSITIVE_HIGH';
        else if (severity === Severity.MEDIUM) classification = 'NEEDS_INVESTIGATION';
        else classification = 'LIKELY_FALSE_POSITIVE';

        console.log(`[ClassificationHandler] Alert ${alert.getId()} classified as: ${classification}`);
        return {
            handled: true,
            handlerName: 'ClassificationHandler',
            data: { classification },
        };
    }
}