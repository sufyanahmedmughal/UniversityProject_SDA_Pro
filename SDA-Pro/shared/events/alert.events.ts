export enum EventType {
    ALERT_INGESTED = 'AlertIngested',
    ALERT_ENRICHED = 'AlertEnriched',
    INCIDENT_CREATED = 'IncidentCreated',
    INCIDENT_STATE_CHANGED = 'IncidentStateChanged',
    RESPONSE_ACTION_EXECUTED = 'ResponseActionExecuted',
    THREAT_INTEL_UPDATED = 'ThreatIntelUpdated',
}

export interface DomainEvent {
    eventId: string;
    eventType: EventType;
    timestamp: string;
    payload: any;
}

export interface AlertIngestedEvent extends DomainEvent {
    eventType: EventType.ALERT_INGESTED;
    payload: {
        alertId: string;
        sourceType: string;
        severity: string;
        timestamp: string;
    };
}

export interface IncidentCreatedEvent extends DomainEvent {
    eventType: EventType.INCIDENT_CREATED;
    payload: {
        incidentId: string;
        severity: string;
        alertIds: string[];
    };
}

export interface IncidentStateChangedEvent extends DomainEvent {
    eventType: EventType.INCIDENT_STATE_CHANGED;
    payload: {
        incidentId: string;
        previousState: string;
        newState: string;
    };
}

export interface ResponseActionExecutedEvent extends DomainEvent {
    eventType: EventType.RESPONSE_ACTION_EXECUTED;
    payload: {
        incidentId: string;
        actionType: string;
        outcome: string;
    };
}