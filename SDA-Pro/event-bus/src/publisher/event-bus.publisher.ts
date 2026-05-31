// PATTERN: Observer + Singleton — EventBusPublisher
import { Observer, Subject } from './observer.interface';
import { DomainEvent } from '../schemas/domain-events';
import { EventType } from '../../../shared/events/alert.events';

export class EventBusPublisher implements Subject {
  // PATTERN: Singleton
  private static instance: EventBusPublisher;

  // PATTERN: Observer — registry
  private observers: Map<string, Observer[]> = new Map();

  private constructor() {}

  static getInstance(): EventBusPublisher {
    if (!EventBusPublisher.instance) {
      EventBusPublisher.instance = new EventBusPublisher();
    }
    return EventBusPublisher.instance;
  }

  attach(eventType: string, observer: Observer): void {
    if (!this.observers.has(eventType)) {
      this.observers.set(eventType, []);
    }
    this.observers.get(eventType)!.push(observer);
    console.log(`[EventBus] Observer ${observer.getObserverId()} subscribed to ${eventType}`);
  }

  detach(eventType: string, observer: Observer): void {
    const list = this.observers.get(eventType) || [];
    this.observers.set(
      eventType,
      list.filter(o => o.getObserverId() !== observer.getObserverId()),
    );
  }

  async notify(event: DomainEvent): Promise<void> {
    const list = this.observers.get(event.eventType) || [];
    console.log(`[EventBus] Publishing ${event.eventType} to ${list.length} observers`);
    await Promise.all(list.map(o => o.update(event)));
  }

  // Convenience publish methods
  async publishAlertIngested(alertId: string, severity: string): Promise<void> {
    await this.notify({
      eventId: Math.random().toString(36).substr(2, 9),
      eventType: EventType.ALERT_INGESTED,
      timestamp: new Date().toISOString(),
      payload: { alertId, severity },
    });
  }

  async publishIncidentCreated(incidentId: string, severity: string): Promise<void> {
    await this.notify({
      eventId: Math.random().toString(36).substr(2, 9),
      eventType: EventType.INCIDENT_CREATED,
      timestamp: new Date().toISOString(),
      payload: { incidentId, severity },
    });
  }

  async publishIncidentStateChanged(
    incidentId: string,
    previousState: string,
    newState: string,
  ): Promise<void> {
    await this.notify({
      eventId: Math.random().toString(36).substr(2, 9),
      eventType: EventType.INCIDENT_STATE_CHANGED,
      timestamp: new Date().toISOString(),
      payload: { incidentId, previousState, newState },
    });
  }

  async publishResponseActionExecuted(
    incidentId: string,
    actionType: string,
    outcome: string,
  ): Promise<void> {
    await this.notify({
      eventId: Math.random().toString(36).substr(2, 9),
      eventType: EventType.RESPONSE_ACTION_EXECUTED,
      timestamp: new Date().toISOString(),
      payload: { incidentId, actionType, outcome },
    });
  }
}