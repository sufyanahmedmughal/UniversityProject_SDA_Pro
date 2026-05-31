import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AlertIngestionService } from '../services/ingestion/alert-ingestion.service';
import { AlertSourceType } from '../../../../shared/contracts/alert.contract';

@Controller('ingest')
export class AlertIngestionController {
    constructor(private ingestionService: AlertIngestionService) { }

    // Push webhook — Splunk
    @Post('splunk')
    async ingestSplunk(@Body() payload: any) {
        return this.ingestionService.ingestAlert(AlertSourceType.SPLUNK, payload);
    }

    // Push webhook — CrowdStrike
    @Post('crowdstrike')
    async ingestCrowdStrike(@Body() payload: any) {
        return this.ingestionService.ingestAlert(AlertSourceType.CROWDSTRIKE, payload);
    }

    // Push webhook — Firewall
    @Post('firewall')
    async ingestFirewall(@Body() payload: any) {
        return this.ingestionService.ingestAlert(AlertSourceType.FIREWALL, payload);
    }

    // Group alerts into campaign
    @Post('campaign')
    async ingestCampaign(@Body() body: {
        sourceType: AlertSourceType;
        payloads: any[];
        campaignName: string;
    }) {
        return this.ingestionService.ingestCampaign(
            body.sourceType,
            body.payloads,
            body.campaignName,
        );
    }

    @Get('alerts')
    async getAllAlerts() {
        return this.ingestionService.getAllAlerts();
    }
}