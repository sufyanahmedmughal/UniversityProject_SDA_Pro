import { Observer, Subject } from './observer.interface';
import { DomainEvent } from '../schemas/domain-events';
export declare class EventBusPublisher implements Subject {
    private static instance;
    private observers;
    private rabbitChannel;
    private wsServerUrl;
    private constructor();
    static getInstance(): EventBusPublisher;
    connectRabbitMQ(): Promise<void>;
    attach(eventType: string, observer: Observer): void;
    detach(eventType: string, observer: Observer): void;
    notify(event: DomainEvent): Promise<void>;
    publishAlertIngested(alertId: string, severity: string): Promise<void>;
    publishIncidentCreated(incidentId: string, severity: string): Promise<void>;
    publishIncidentStateChanged(incidentId: string, from: string, to: string): Promise<void>;
    publishResponseActionExecuted(incidentId: string, actionType: string, outcome: string): Promise<void>;
}
