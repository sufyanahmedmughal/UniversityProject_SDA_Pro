// PATTERN: Observer — Subscriber 4
import { Observer } from '../publisher/observer.interface';
import { DomainEvent } from '../schemas/domain-events';

export class MetricsCollector implements Observer {
  getObserverId(): string { return 'MetricsCollector'; }

  private metrics = {
    totalAlerts: 0,
    totalIncidents: 0,
    totalActions: 0,
  };

  async update(event: DomainEvent): Promise<void> {
    if (event.eventType === 'AlertIngested') this.metrics.totalAlerts++;
    if (event.eventType === 'IncidentCreated') this.metrics.totalIncidents++;
    if (event.eventType === 'ResponseActionExecuted') this.metrics.totalActions++;
    console.log(`[MetricsCollector] Metrics:`, this.metrics);
  }
}