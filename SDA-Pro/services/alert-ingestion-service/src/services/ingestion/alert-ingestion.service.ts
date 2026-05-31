import { Injectable } from '@nestjs/common';
import { AlertNormalizerFactory } from '../normalizer/alert-normalizer.factory';
import { AlertRepository } from '../../repositories/alert.repository';
import { AlertEntity } from '../../domain/alert/alert.entity';
import { SingleAlert } from '../../domain/alert/single-alert';
import { AlertCampaign } from '../../domain/alert/alert-campaign';
import { IngestionConfigManager } from '../../config/ingestion-config.manager';
import { AlertSourceType } from '../../../../../shared/contracts/alert.contract';
import { EventBusPublisher } from '../../../../../event-bus/src/publisher/event-bus.publisher';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlertIngestionService {
    // PATTERN: Singleton — single config manager
    private config = IngestionConfigManager.getInstance();
    private eventBus = EventBusPublisher.getInstance();

    constructor(private alertRepo: AlertRepository) { }

    async ingestAlert(sourceType: AlertSourceType, rawPayload: any): Promise<any> {
        // Check if source enabled
        if (!this.config.isIngestionEnabled(sourceType)) {
            throw new Error(`Ingestion disabled for: ${sourceType}`);
        }

        // PATTERN: Factory Method — get correct normalizer
        const normalizer = AlertNormalizerFactory.createNormalizer(sourceType);
        const canonical = normalizer.normalize(rawPayload);

        // PATTERN: Composite — wrap in SingleAlert leaf
        const alert = new SingleAlert(canonical);

        // Save to DB
        const entity = new AlertEntity();
        entity.id = canonical.id;
        entity.sourceType = canonical.sourceType;
        entity.severity = canonical.severity;
        entity.sourceIP = canonical.sourceIP;
        entity.destinationIP = canonical.destinationIP;
        entity.description = canonical.description;
        entity.rawPayload = canonical.rawPayload;

        await this.alertRepo.save(entity);

        // PATTERN: Observer — publish event
        await this.eventBus.publishAlertIngested(canonical.id, canonical.severity);

        console.log(`[IngestionService] Alert ingested: ${canonical.id}`);
        return { alertId: canonical.id, severity: canonical.severity };
    }

    async ingestCampaign(
        sourceType: AlertSourceType,
        payloads: any[],
        campaignName: string,
    ): Promise<any> {
        // PATTERN: Composite — group multiple alerts into campaign
        const campaign = new AlertCampaign(uuidv4(), campaignName, 'multi-stage');

        for (const payload of payloads) {
            const normalizer = AlertNormalizerFactory.createNormalizer(sourceType);
            const canonical = normalizer.normalize(payload);
            const alert = new SingleAlert(canonical);
            campaign.add(alert);

            // Save each alert
            const entity = new AlertEntity();
            entity.id = canonical.id;
            entity.sourceType = canonical.sourceType;
            entity.severity = canonical.severity;
            entity.sourceIP = canonical.sourceIP;
            entity.destinationIP = canonical.destinationIP;
            entity.description = canonical.description;
            entity.rawPayload = canonical.rawPayload;
            await this.alertRepo.save(entity);
        }

        await this.eventBus.publishAlertIngested(campaign.getId(), campaign.getSeverity());

        return {
            campaignId: campaign.getId(),
            alertCount: payloads.length,
            maxSeverity: campaign.getSeverity(),
        };
    }

    async getAllAlerts(): Promise<AlertEntity[]> {
        return this.alertRepo.findAll();
    }
}