import { Controller, Post, Body } from '@nestjs/common';
import { EnrichmentService } from '../services/enrichment.service';

@Controller('enrichment')
export class EnrichmentController {
    constructor(private enrichmentService: EnrichmentService) { }

    @Post('enrich')
    async enrich(@Body() body: { alertId: string; severity: string }) {
        return this.enrichmentService.enrichAlert(body.alertId, body.severity);
    }
}