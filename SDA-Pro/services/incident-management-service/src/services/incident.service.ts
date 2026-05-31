import { Injectable } from '@nestjs/common';
import { Incident } from '../domain/incident/incident.entity';
import { IncidentRepository } from '../repositories/incident.repository';
import { IncidentEntity } from '../domain/incident/incident.entity.db';
import { EventBusPublisher } from '../../../../event-bus/src/publisher/event-bus.publisher';
import { ResponseActionType } from '../../../../shared/contracts/incident.contract';

@Injectable()
export class IncidentService {
    private eventBus = EventBusPublisher.getInstance();
    // In-memory store for domain objects
    private incidents = new Map<string, Incident>();

    constructor(private incidentRepo: IncidentRepository) { }

    async createIncident(alertIds: string[], severity: string): Promise<any> {
        // PATTERN: State — starts in NewState
        const incident = new Incident(alertIds, severity);
        this.incidents.set(incident.getId(), incident);

        // Persist to DB
        const entity = new IncidentEntity();
        entity.id = incident.getId();
        entity.state = incident.getStateName();
        entity.severity = severity;
        entity.affectedAlertIds = alertIds;
        await this.incidentRepo.save(entity);

        // PATTERN: Observer — publish
        await this.eventBus.publishIncidentCreated(incident.getId(), severity);

        return incident.toDTO();
    }

    async beginTriage(incidentId: string, analystId: string): Promise<any> {
        const incident = this.incidents.get(incidentId);
        if (!incident) throw new Error(`Incident not found: ${incidentId}`);

        const prevState = incident.getStateName();
        incident.beginTriage(analystId);

        await this.incidentRepo.updateState(incidentId, incident.getStateName());
        await this.eventBus.publishIncidentStateChanged(
            incidentId, prevState, incident.getStateName(),
        );

        return incident.toDTO();
    }

    async initiateContainment(
        incidentId: string,
        actions: ResponseActionType[],
    ): Promise<any> {
        const incident = this.incidents.get(incidentId);
        if (!incident) throw new Error(`Incident not found: ${incidentId}`);

        const prevState = incident.getStateName();
        incident.initiateContainment(actions);

        await this.incidentRepo.updateState(incidentId, incident.getStateName());
        await this.eventBus.publishIncidentStateChanged(
            incidentId, prevState, incident.getStateName(),
        );

        return incident.toDTO();
    }

    async beginEradication(incidentId: string): Promise<any> {
        const incident = this.incidents.get(incidentId);
        if (!incident) throw new Error(`Incident not found: ${incidentId}`);

        const prevState = incident.getStateName();
        incident.beginEradication();

        await this.incidentRepo.updateState(incidentId, incident.getStateName());
        await this.eventBus.publishIncidentStateChanged(
            incidentId, prevState, incident.getStateName(),
        );

        return incident.toDTO();
    }

    async beginRecovery(incidentId: string): Promise<any> {
        const incident = this.incidents.get(incidentId);
        if (!incident) throw new Error(`Incident not found: ${incidentId}`);

        const prevState = incident.getStateName();
        incident.beginRecovery();

        await this.incidentRepo.updateState(incidentId, incident.getStateName());
        await this.eventBus.publishIncidentStateChanged(
            incidentId, prevState, incident.getStateName(),
        );

        return incident.toDTO();
    }

    async closeIncident(incidentId: string): Promise<any> {
        const incident = this.incidents.get(incidentId);
        if (!incident) throw new Error(`Incident not found: ${incidentId}`);

        const prevState = incident.getStateName();
        incident.beginPostReview();
        incident.close();

        await this.incidentRepo.updateState(incidentId, incident.getStateName());
        await this.eventBus.publishIncidentStateChanged(
            incidentId, prevState, incident.getStateName(),
        );

        return incident.toDTO();
    }

    async getAllIncidents(): Promise<IncidentEntity[]> {
        return this.incidentRepo.findAll();
    }

    async getIncidentById(id: string): Promise<any> {
        const incident = this.incidents.get(id);
        if (incident) return incident.toDTO();
        return this.incidentRepo.findById(id);
    }
}