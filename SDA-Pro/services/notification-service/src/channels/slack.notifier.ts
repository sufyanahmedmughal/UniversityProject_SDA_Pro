// PATTERN: Abstract Factory — Concrete Product
import { Notifier, Notification, DeliveryResult } from './notifier.interface';

export class SlackNotifier implements Notifier {
  getChannelName(): string { return 'Slack'; }

  async send(notification: Notification): Promise<DeliveryResult> {
    console.log(`[SlackNotifier] Posting to Slack: ${notification.title}`);
    // Real impl: call Slack webhook
    return {
      success: true,
      channel: 'Slack',
      deliveredAt: new Date().toISOString(),
    };
  }
}