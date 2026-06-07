// PATTERN: Chain of Responsibility — Handler 3
import { EnrichmentHandler, EnrichmentResult } from './enrichment-handler.abstract';
import { AlertComponent } from '../../domain/composite/alert-component.interface';

export class ThreatIntelHandler extends EnrichmentHandler {
    protected async doEnrich(alert: AlertComponent): Promise<EnrichmentResult> {

        const mockReputation = {
            score: 92,
            verdict: 'MALICIOUS',
            source: 'VirusTotal',
            tags: ['APT29', 'lateral-movement'],
        };
        console.log(`[ThreatIntelHandler] Enriched alert ${alert.getId()} with threat intel`);
        return {
            handled: true,
            handlerName: 'ThreatIntelHandler',
            data: { reputation: mockReputation },
        };
    }
}