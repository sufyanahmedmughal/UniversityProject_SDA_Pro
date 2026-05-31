import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { IncidentResponseFacade } from '../services/facade/incident-response.facade';

@Controller('response')
export class ResponseController {
    // PATTERN: Facade — single entry point
    private facade = new IncidentResponseFacade();

    @Post(':incidentId/execute')
    async executeResponse(
        @Param('incidentId') incidentId: string,
        @Body() body: {
            severity: string;
            assetCriticality: string;
            targetIP: string;
        },
    ) {
        const outcomes = await this.facade.assessAndRespond(
            incidentId,
            body.severity,
            body.assetCriticality,
            body.targetIP,
        );
        return { incidentId, outcomes };
    }
}