// PATTERN: Abstract Factory — Concrete Product
import { Notifier, Notification, DeliveryResult } from './notifier.interface';

export class EmailNotifier implements Notifier {
  getChannelName(): string { return 'Email'; }

  async send(notification: Notification): Promise<DeliveryResult> {
    console.log(`[EmailNotifier] Sending email: ${notification.title}`);
    // Real impl: use nodemailer
    return {
      success: true,
      channel: 'Email',
      deliveredAt: new Date().toISOString(),
    };
  }
}