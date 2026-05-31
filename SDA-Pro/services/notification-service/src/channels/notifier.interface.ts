// PATTERN: Abstract Factory — Product interfaces
export interface Notification {
  title: string;
  message: string;
  severity: string;
  incidentId: string;
}

export interface DeliveryResult {
  success: boolean;
  channel: string;
  deliveredAt: string;
}

export interface Notifier {
  send(notification: Notification): Promise<DeliveryResult>;
  getChannelName(): string;
}