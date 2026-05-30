// PATTERN: Chain of Responsibility — Handler 2
import { EnrichmentHandler, EnrichmentResult } from './enrichment-handler.abstract';
import { AlertComponent } from '../../domain/composite/alert-component.interface';

export class GeoIPHandler extends EnrichmentHandler {
    protected async doEnrich(alert: AlertComponent): Promise<EnrichmentResult> {
        // Mock GeoIP lookup — real impl calls MaxMind or ip-api
        const mockGeo = {
            country: 'Russia',
            city: 'Moscow',
            latitude: 55.75,
            longitude: 37.61,
            riskScore: 85,
        };
        console.log(`[GeoIPHandler] Enriched alert ${alert.getId()} with geo data`);
        return {
            handled: true,
            handlerName: 'GeoIPHandler',
            data: { geoLocation: mockGeo },
        };
    }
}