import { Injectable } from '@nestjs/common';
import { PipelineAssembler } from './pipeline/pipeline.assembler';
import { AlertComponent } from '../domain/composite/alert-component.interface';
import { EventBusPublisher } from '../../../../event-bus/src/publisher/event-bus.publisher';

// Simple in-memory alert component for enrichment
class SimpleAlert implements AlertComponent {
    constructor(
        private id: string,
        private severity: any,
        private timestamp: string,
    ) { }
    getId(): string { return this.id; }
    getSeverity(): any { return this.severity; }
    getTimestamp(): string { return this.timestamp; }
    getChildren(): AlertComponent[] { return []; }
    isLeaf(): boolean { return true; }
}

@Injectable()
export class EnrichmentService {
    private eventBus = EventBusPublisher.getInstance();

    async enrichAlert(alertId: string, severity: string): Promise<any> {
        // Build pipeline — PATTERN: Chain of Responsibility
        const pipeline = PipelineAssembler.buildDefaultPipeline();

        const alert = new SimpleAlert(alertId, severity, new Date().toISOString());
        const results = await pipeline.handle(alert);

        // PATTERN: Observer — publish enriched event
        await this.eventBus.notify({
            eventId: Math.random().toString(36).substr(2, 9),
            eventType: 'AlertEnriched' as any,
            timestamp: new Date().toISOString(),
            payload: { alertId, enrichmentResults: results },
        });

        console.log(`[EnrichmentService] Alert ${alertId} enriched`);
        return { alertId, enrichmentResults: results };
    }
}