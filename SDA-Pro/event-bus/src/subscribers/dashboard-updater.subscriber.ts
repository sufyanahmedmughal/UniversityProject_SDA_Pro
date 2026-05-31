// PATTERN: Observer — Subscriber 1
import { Observer } from '../publisher/observer.interface';
import { DomainEvent } from '../schemas/domain-events';

export class DashboardUpdater implements Observer {
  getObserverId(): string { return 'DashboardUpdater'; }

  async update(event: DomainEvent): Promise<void> {
    console.log(`[DashboardUpdater] Received: ${event.eventType}`);
    // Real impl: push via WebSocket to React dashboard
    // wsManager.broadcast(event.eventType, event.payload);
    console.log(`[DashboardUpdater] Dashboard updated with:`, event.payload);
  }
}