import { EventType } from '../../../shared/events/alert.events';
export interface DomainEvent {
    eventId: string;
    eventType: EventType;
    timestamp: string;
    payload: any;
}
export declare function createEvent(type: EventType, payload: any): DomainEvent;
