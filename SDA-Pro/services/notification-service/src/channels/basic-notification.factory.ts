// PATTERN: Abstract Factory — Concrete Factory (Basic tier)
import { NotificationFactory } from './notification-factory.interface';
import { Notifier } from './notifier.interface';
import { EmailNotifier } from './email.notifier';
import { SlackNotifier } from './slack.notifier';

// Basic tier: no PagerDuty
class NoOpNotifier implements Notifier {
  getChannelName(): string { return 'NoOp'; }
  async send(): Promise<any> {
    return { success: false, channel: 'NoOp', deliveredAt: new Date().toISOString() };
  }
}

export class BasicNotificationFactory implements NotificationFactory {
  createEmailNotifier(): Notifier { return new EmailNotifier(); }
  createSlackNotifier(): Notifier { return new SlackNotifier(); }
  createPagerDutyNotifier(): Notifier { return new NoOpNotifier(); }
}