import * as amqp from 'amqplib';
import axios from 'axios';
import { Observer, Subject } from './observer.interface';
import { DomainEvent } from '../schemas/domain-events';
import { EventType } from '../../../shared/events/alert.events';

export class EventBusPublisher implements Subject {
  private static instance: EventBusPublisher;
  private observers: Map<string, Observer[]> = new Map();
  private rabbitChannel: amqp.Channel | null = null;
  private wsServerUrl = process.env.WS_SERVER_URL || 'http://localhost:3008';

  private constructor() {}

  static getInstance(): EventBusPublisher {
    if (!EventBusPublisher.instance) {
      EventBusPublisher.instance = new EventBusPublisher();
    }
    return EventBusPublisher.instance;
  }

  async connectRabbitMQ(): Promise<void> {
    try {
      const url = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
      const conn = await amqp.connect(url);
      this.rabbitChannel = await conn.createChannel();
      console.log('[EventBus] RabbitMQ connected');
    } catch (err) {
      console.error('[EventBus] RabbitMQ failed — using in-memory only');
    }
  }

  attach(eventType: string, observer: Observer): void {
    if (!this.observers.has(eventType)) {
      this.observers.set(eventType, []);
    }
    this.observers.get(eventType)!.push(observer);
  }

  detach(eventType: string, observer: Observer): void {
    const list = this.observers.get(eventType) || [];
    this.observers.set(
      eventType,
      list.filter(o => o.getObserverId() !== observer.getObserverId()),
    );
  }

  async notify(event: DomainEvent): Promise<void> {
    // 1. In-memory observers
    const list = this.observers.get(event.eventType) || [];
    await Promise.all(list.map(o => o.update(event)));

    // 2. RabbitMQ publish
    if (this.rabbitChannel) {
      try {
        const queue = `sda.${event.eventType.toLowerCase()}`;
        await this.rabbitChannel.assertQueue(queue, { durable: true });
        this.rabbitChannel.sendToQueue(
          queue,
          Buffer.from(JSON.stringify(event)),
          { persistent: true },
        );
      } catch (err) {
        console.error('[EventBus] RabbitMQ publish failed');
      }
    }

    // 3. Push to WebSocket server — dashboard gets real-time update
    try {
      await axios.post(`${this.wsServerUrl}/events`, event, { timeout: 1000 });
    } catch (err) {
      // WS server not running — ignore
    }
  }

  async publishAlertIngested(alertId: string, severity: string): Promise<void> {
    await this.notify({
      eventId: Math.random().toString(36).substr(2, 9),
      eventType: EventType.ALERT_INGESTED,
      timestamp: new Date().toISOString(),
      payload: { alertId, severity },
    });
  }

  async publishIncidentCreated(incidentId: string, severity: string): Promise<void> {
    await this.notify({
      eventId: Math.random().toString(36).substr(2, 9),
      eventType: EventType.INCIDENT_CREATED,
      timestamp: new Date().toISOString(),
      payload: { incidentId, severity },
    });
  }

  async publishIncidentStateChanged(
    incidentId: string,
    from: string,
    to: string,
  ): Promise<void> {
    await this.notify({
      eventId: Math.random().toString(36).substr(2, 9),
      eventType: EventType.INCIDENT_STATE_CHANGED,
      timestamp: new Date().toISOString(),
      payload: { incidentId, previousState: from, newState: to },
    });
  }

  async publishResponseActionExecuted(
    incidentId: string,
    actionType: string,
    outcome: string,
  ): Promise<void> {
    await this.notify({
      eventId: Math.random().toString(36).substr(2, 9),
      eventType: EventType.RESPONSE_ACTION_EXECUTED,
      timestamp: new Date().toISOString(),
      payload: { incidentId, actionType, outcome },
    });
  }
}