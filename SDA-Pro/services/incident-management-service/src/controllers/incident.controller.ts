import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { IncidentService } from '../services/incident.service';
import { ResponseActionType } from '../../../../shared/contracts/incident.contract';

@Controller('incidents')
export class IncidentController {
    constructor(private incidentService: IncidentService) { }

    @Post()
    async create(@Body() body: { alertIds: string[]; severity: string }) {
        return this.incidentService.createIncident(body.alertIds, body.severity);
    }

    @Get()
    async getAll() {
        return this.incidentService.getAllIncidents();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.incidentService.getIncidentById(id);
    }

    @Post(':id/triage')
    async beginTriage(
        @Param('id') id: string,
        @Body() body: { analystId: string },
    ) {
        return this.incidentService.beginTriage(id, body.analystId);
    }

    @Post(':id/containment')
    async initiateContainment(
        @Param('id') id: string,
        @Body() body: { actions: ResponseActionType[] },
    ) {
        return this.incidentService.initiateContainment(id, body.actions);
    }

    @Post(':id/eradication')
    async beginEradication(@Param('id') id: string) {
        return this.incidentService.beginEradication(id);
    }

    @Post(':id/recovery')
    async beginRecovery(@Param('id') id: string) {
        return this.incidentService.beginRecovery(id);
    }

    @Post(':id/close')
    async close(@Param('id') id: string) {
        return this.incidentService.closeIncident(id);
    }
}