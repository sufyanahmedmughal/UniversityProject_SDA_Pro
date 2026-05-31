// PATTERN: Observer — Subscriber 3
import { Observer } from '../publisher/observer.interface';
import { DomainEvent } from '../schemas/domain-events';
import { EventType } from '../../../shared/events/alert.events';

export class NotificationDispatcher implements Observer {
  getObserverId(): string { return 'NotificationDispatcher'; }

  async update(event: DomainEvent): Promise<void> {
    console.log(`[NotificationDispatcher] Received: ${event.eventType}`);

    if (event.eventType === EventType.INCIDENT_CREATED) {
      await this.sendCriticalAlert(event.payload);
    }
    if (event.eventType === EventType.RESPONSE_ACTION_EXECUTED) {
      await this.sendActionReport(event.payload);
    }
  }

  private async sendCriticalAlert(payload: any): Promise<void> {
    console.log(`[NotificationDispatcher] Sending PagerDuty alert for incident: ${payload.incidentId}`);
    // Real impl: call notification-service
  }

  private async sendActionReport(payload: any): Promise<void> {
    console.log(`[NotificationDispatcher] Sending Slack message for action: ${payload.actionType}`);
  }
}