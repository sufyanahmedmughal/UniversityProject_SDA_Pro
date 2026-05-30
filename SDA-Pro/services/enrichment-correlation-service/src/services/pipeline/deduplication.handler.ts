// PATTERN: Chain of Responsibility — Handler 1
import { EnrichmentHandler, EnrichmentResult } from './enrichment-handler.abstract';
import { AlertComponent } from '../../domain/composite/alert-component.interface';

export class DeduplicationHandler extends EnrichmentHandler {
    private seenAlerts = new Set<string>();

    protected async doEnrich(alert: AlertComponent): Promise<EnrichmentResult> {
        const id = alert.getId();
        if (this.seenAlerts.has(id)) {
            return { handled: true, handlerName: 'DeduplicationHandler', data: { duplicate: true } };
        }
        this.seenAlerts.add(id);
        return { handled: true, handlerName: 'DeduplicationHandler', data: { duplicate: false } };
    }
}