// Wire all observers to event bus
import { EventBusPublisher } from './publisher/event-bus.publisher';
import { DashboardUpdater } from './subscribers/dashboard-updater.subscriber';
import { AuditEventLogger } from './subscribers/audit-logger.subscriber';
import { NotificationDispatcher } from './subscribers/notification-dispatcher.subscriber';
import { MetricsCollector } from './subscribers/metrics-collector.subscriber';
import { EventType } from '../../shared/events/alert.events';

export function bootstrapEventBus(): EventBusPublisher {
  const bus = EventBusPublisher.getInstance();

  const dashboard = new DashboardUpdater();
  const audit = new AuditEventLogger();
  const notif = new NotificationDispatcher();
  const metrics = new MetricsCollector();

  // AlertIngested → Dashboard, Audit, Metrics
  bus.attach(EventType.ALERT_INGESTED, dashboard);
  bus.attach(EventType.ALERT_INGESTED, audit);
  bus.attach(EventType.ALERT_INGESTED, metrics);

  // IncidentCreated → Dashboard, Notification, Audit
  bus.attach(EventType.INCIDENT_CREATED, dashboard);
  bus.attach(EventType.INCIDENT_CREATED, notif);
  bus.attach(EventType.INCIDENT_CREATED, audit);

  // IncidentStateChanged → Dashboard, Audit, Metrics
  bus.attach(EventType.INCIDENT_STATE_CHANGED, dashboard);
  bus.attach(EventType.INCIDENT_STATE_CHANGED, audit);
  bus.attach(EventType.INCIDENT_STATE_CHANGED, metrics);

  // ResponseActionExecuted → Dashboard, Audit, Notification
  bus.attach(EventType.RESPONSE_ACTION_EXECUTED, dashboard);
  bus.attach(EventType.RESPONSE_ACTION_EXECUTED, audit);
  bus.attach(EventType.RESPONSE_ACTION_EXECUTED, notif);

  console.log('[EventBus] All observers registered');
  return bus;
}