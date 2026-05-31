// PATTERN: Observer — Event definitions
import { EventType } from '../../../shared/events/alert.events';

export interface DomainEvent {
  eventId: string;
  eventType: EventType;
  timestamp: string;
  payload: any;
}

export function createEvent(type: EventType, payload: any): DomainEvent {
  return {
    eventId: Math.random().toString(36).substr(2, 9),
    eventType: type,
    timestamp: new Date().toISOString(),
    payload,
  };
}