// PATTERN: Chain of Responsibility — Pipeline builder
import { EnrichmentHandler } from './enrichment-handler.abstract';
import { DeduplicationHandler } from './deduplication.handler';
import { GeoIPHandler } from './geoip.handler';
import { ThreatIntelHandler } from './threat-intel.handler';
import { AssetContextHandler } from './asset-context.handler';
import { ClassificationHandler } from './classification.handler';

export class PipelineAssembler {
    static buildDefaultPipeline(): EnrichmentHandler {
        const dedup = new DeduplicationHandler();
        const geoip = new GeoIPHandler();
        const threatIntel = new ThreatIntelHandler();
        const assetCtx = new AssetContextHandler();
        const classify = new ClassificationHandler();

        // Chain: dedup → geoip → threatIntel → assetCtx → classify
        dedup.setNext(geoip).setNext(threatIntel).setNext(assetCtx).setNext(classify);

        return dedup; // return head of chain
    }
}