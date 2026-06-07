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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertIngestionController = void 0;
const common_1 = require("@nestjs/common");
const alert_ingestion_service_1 = require("../services/ingestion/alert-ingestion.service");
const alert_contract_1 = require("../../../../shared/contracts/alert.contract");
let AlertIngestionController = class AlertIngestionController {
    constructor(ingestionService) {
        this.ingestionService = ingestionService;
    }
    async ingestSplunk(payload) {
        return this.ingestionService.ingestAlert(alert_contract_1.AlertSourceType.SPLUNK, payload);
    }
    async ingestCrowdStrike(payload) {
        return this.ingestionService.ingestAlert(alert_contract_1.AlertSourceType.CROWDSTRIKE, payload);
    }
    async ingestFirewall(payload) {
        return this.ingestionService.ingestAlert(alert_contract_1.AlertSourceType.FIREWALL, payload);
    }
    async ingestCampaign(body) {
        return this.ingestionService.ingestCampaign(body.sourceType, body.payloads, body.campaignName);
    }
    async getAllAlerts() {
        return this.ingestionService.getAllAlerts();
    }
};
exports.AlertIngestionController = AlertIngestionController;
__decorate([
    (0, common_1.Post)('splunk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertIngestionController.prototype, "ingestSplunk", null);
__decorate([
    (0, common_1.Post)('crowdstrike'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertIngestionController.prototype, "ingestCrowdStrike", null);
__decorate([
    (0, common_1.Post)('firewall'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertIngestionController.prototype, "ingestFirewall", null);
__decorate([
    (0, common_1.Post)('campaign'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertIngestionController.prototype, "ingestCampaign", null);
__decorate([
    (0, common_1.Get)('alerts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlertIngestionController.prototype, "getAllAlerts", null);
exports.AlertIngestionController = AlertIngestionController = __decorate([
    (0, common_1.Controller)('ingest'),
    __metadata("design:paramtypes", [alert_ingestion_service_1.AlertIngestionService])
], AlertIngestionController);
//# sourceMappingURL=alert-ingestion.controller.js.map