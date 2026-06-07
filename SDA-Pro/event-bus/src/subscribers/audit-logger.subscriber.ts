// PATTERN: Observer — Subscriber 2
import { Observer } from '../publisher/observer.interface';
import { DomainEvent } from '../schemas/domain-events';

export class AuditEventLogger implements Observer {
  getObserverId(): string { return 'AuditEventLogger'; }

  async update(event: DomainEvent): Promise<void> {
    console.log(`[AuditLogger] Logging event: ${event.eventType}`);
    // Real impl: write to audit-service DB
    const auditEntry = {
      eventId: event.eventId,
      eventType: event.eventType,
      timestamp: event.timestamp,
      payload: JSON.stringify(event.payload),
      immutable: true,
    };
    console.log(`[AuditLogger] Audit entry:`, auditEntry);
  }
}