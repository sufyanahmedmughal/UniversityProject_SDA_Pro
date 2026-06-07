// PATTERN: Abstract Factory — Factory interface
import { Notifier } from './notifier.interface';

export interface NotificationFactory {
  createEmailNotifier(): Notifier;
  createSlackNotifier(): Notifier;
  createPagerDutyNotifier(): Notifier;
}