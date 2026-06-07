"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertIngestionService = void 0;
const common_1 = require("@nestjs/common");
const alert_normalizer_factory_1 = require("../normalizer/alert-normalizer.factory");
const alert_repository_1 = require("../../repositories/alert.repository");
const alert_entity_1 = require("../../domain/alert/alert.entity");
const single_alert_1 = require("../../domain/alert/single-alert");
const alert_campaign_1 = require("../../domain/alert/alert-campaign");
const ingestion_config_manager_1 = require("../../config/ingestion-config.manager");
const event_bus_publisher_1 = require("../../../../../event-bus/src/publisher/event-bus.publisher");
const uuid_1 = require("uuid");
let AlertIngestionService = class AlertIngestionService {
    constructor(alertRepo) {
        this.alertRepo = alertRepo;
        this.config = ingestion_config_manager_1.IngestionConfigManager.getInstance();
        this.eventBus = event_bus_publisher_1.EventBusPublisher.getInstance();
    }
    async ingestAlert(sourceType, rawPayload) {
        if (!this.config.isIngestionEnabled(sourceType)) {
            throw new Error(`Ingestion disabled for: ${sourceType}`);
        }
        const normalizer = alert_normalizer_factory_1.AlertNormalizerFactory.createNormalizer(sourceType);
        const canonical = normalizer.normalize(rawPayload);
        const alert = new single_alert_1.SingleAlert(canonical);
        const entity = new alert_entity_1.AlertEntity();
        entity.id = canonical.id;
        entity.sourceType = canonical.sourceType;
        entity.severity = canonical.severity;
        entity.sourceIP = canonical.sourceIP;
        entity.destinationIP = canonical.destinationIP;
        entity.description = canonical.description;
        entity.rawPayload = canonical.rawPayload;
        await this.alertRepo.save(entity);
        await this.eventBus.publishAlertIngested(canonical.id, canonical.severity);
        console.log(`[IngestionService] Alert ingested: ${canonical.id}`);
        return { alertId: canonical.id, severity: canonical.severity };
    }
    async ingestCampaign(sourceType, payloads, campaignName) {
        const campaign = new alert_campaign_1.AlertCampaign((0, uuid_1.v4)(), campaignName, 'multi-stage');
        for (const payload of payloads) {
            const normalizer = alert_normalizer_factory_1.AlertNormalizerFactory.createNormalizer(sourceType);
            const canonical = normalizer.normalize(payload);
            const alert = new single_alert_1.SingleAlert(canonical);
            campaign.add(alert);
            const entity = new alert_entity_1.AlertEntity();
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
    async getAllAlerts() {
        return this.alertRepo.findAll();
    }
};
exports.AlertIngestionService = AlertIngestionService;
exports.AlertIngestionService = AlertIngestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [alert_repository_1.AlertRepository])
], AlertIngestionService);
//# sourceMappingURL=alert-ingestion.service.js.map