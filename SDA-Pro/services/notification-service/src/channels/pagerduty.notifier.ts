// PATTERN: Abstract Factory — Concrete Product
import { Notifier, Notification, DeliveryResult } from './notifier.interface';

export class PagerDutyNotifier implements Notifier {
  getChannelName(): string { return 'PagerDuty'; }

  async send(notification: Notification): Promise<DeliveryResult> {
    console.log(`[PagerDutyNotifier] Triggering PagerDuty: ${notification.title}`);
    // Real impl: call PagerDuty Events API
    return {
      success: true,
      channel: 'PagerDuty',
      deliveredAt: new Date().toISOString(),
    };
  }
}