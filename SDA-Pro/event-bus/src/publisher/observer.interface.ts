// PATTERN: Observer — interfaces
import { DomainEvent } from '../schemas/domain-events';

export interface Observer {
  update(event: DomainEvent): Promise<void>;
  getObserverId(): string;
}

export interface Subject {
  attach(eventType: string, observer: Observer): void;
  detach(eventType: string, observer: Observer): void;
  notify(event: DomainEvent): Promise<void>;
}