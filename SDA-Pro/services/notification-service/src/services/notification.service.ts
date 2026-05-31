// Uses whichever factory is configured
import { NotificationFactory } from '../channels/notification-factory.interface';
import { Notification } from '../channels/notifier.interface';
import { EnterpriseNotificationFactory } from '../channels/enterprise-notification.factory';

export class NotificationService {
  private factory: NotificationFactory;

  constructor(tier: 'enterprise' | 'basic' = 'enterprise') {
    // Real impl: read from config
    this.factory = new EnterpriseNotificationFactory();
  }

  async dispatchCriticalAlert(notification: Notification): Promise<void> {
    const pagerDuty = this.factory.createPagerDutyNotifier();
    const slack = this.factory.createSlackNotifier();

    await Promise.all([
      pagerDuty.send(notification),
      slack.send(notification),
    ]);
  }

  async dispatchReport(notification: Notification): Promise<void> {
    const email = this.factory.createEmailNotifier();
    await email.send(notification);
  }
}