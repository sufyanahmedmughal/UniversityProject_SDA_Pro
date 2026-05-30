// PATTERN: Chain of Responsibility — Handler 4
import { EnrichmentHandler, EnrichmentResult } from './enrichment-handler.abstract';
import { AlertComponent } from '../../domain/composite/alert-component.interface';

export class AssetContextHandler extends EnrichmentHandler {
    protected async doEnrich(alert: AlertComponent): Promise<EnrichmentResult> {
        // Mock asset lookup
        const mockAsset = {
            hostname: 'PROD-SERVER-01',
            criticality: 'HIGH',
            owner: 'finance-team',
            environment: 'production',
        };
        console.log(`[AssetContextHandler] Enriched alert ${alert.getId()} with asset data`);
        return {
            handled: true,
            handlerName: 'AssetContextHandler',
            data: { asset: mockAsset },
        };
    }
}