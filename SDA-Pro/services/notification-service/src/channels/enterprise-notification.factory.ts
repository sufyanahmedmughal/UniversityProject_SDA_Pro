// PATTERN: Abstract Factory — Concrete Factory (Enterprise tier)
import { NotificationFactory } from './notification-factory.interface';
import { Notifier } from './notifier.interface';
import { EmailNotifier } from './email.notifier';
import { SlackNotifier } from './slack.notifier';
import { PagerDutyNotifier } from './pagerduty.notifier';

export class EnterpriseNotificationFactory implements NotificationFactory {
  createEmailNotifier(): Notifier { return new EmailNotifier(); }
  createSlackNotifier(): Notifier { return new SlackNotifier(); }
  createPagerDutyNotifier(): Notifier { return new PagerDutyNotifier(); }
}