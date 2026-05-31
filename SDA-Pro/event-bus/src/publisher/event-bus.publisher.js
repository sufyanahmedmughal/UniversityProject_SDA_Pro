"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBusPublisher = void 0;
const amqp = __importStar(require("amqplib"));
const axios_1 = __importDefault(require("axios"));
const alert_events_1 = require("../../../shared/events/alert.events");
class EventBusPublisher {
    constructor() {
        this.observers = new Map();
        this.rabbitChannel = null;
        this.wsServerUrl = process.env.WS_SERVER_URL || 'http://localhost:3008';
    }
    static getInstance() {
        if (!EventBusPublisher.instance) {
            EventBusPublisher.instance = new EventBusPublisher();
        }
        return EventBusPublisher.instance;
    }
    async connectRabbitMQ() {
        try {
            const url = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
            const conn = await amqp.connect(url);
            this.rabbitChannel = await conn.createChannel();
            console.log('[EventBus] RabbitMQ connected');
        }
        catch (err) {
            console.error('[EventBus] RabbitMQ failed — using in-memory only');
        }
    }
    attach(eventType, observer) {
        if (!this.observers.has(eventType)) {
            this.observers.set(eventType, []);
        }
        this.observers.get(eventType).push(observer);
    }
    detach(eventType, observer) {
        const list = this.observers.get(eventType) || [];
        this.observers.set(eventType, list.filter(o => o.getObserverId() !== observer.getObserverId()));
    }
    async notify(event) {
        const list = this.observers.get(event.eventType) || [];
        await Promise.all(list.map(o => o.update(event)));
        if (this.rabbitChannel) {
            try {
                const queue = `sda.${event.eventType.toLowerCase()}`;
                await this.rabbitChannel.assertQueue(queue, { durable: true });
                this.rabbitChannel.sendToQueue(queue, Buffer.from(JSON.stringify(event)), { persistent: true });
            }
            catch (err) {
                console.error('[EventBus] RabbitMQ publish failed');
            }
        }
        try {
            await axios_1.default.post(`${this.wsServerUrl}/events`, event, { timeout: 1000 });
        }
        catch (err) {
        }
    }
    async publishAlertIngested(alertId, severity) {
        await this.notify({
            eventId: Math.random().toString(36).substr(2, 9),
            eventType: alert_events_1.EventType.ALERT_INGESTED,
            timestamp: new Date().toISOString(),
            payload: { alertId, severity },
        });
    }
    async publishIncidentCreated(incidentId, severity) {
        await this.notify({
            eventId: Math.random().toString(36).substr(2, 9),
            eventType: alert_events_1.EventType.INCIDENT_CREATED,
            timestamp: new Date().toISOString(),
            payload: { incidentId, severity },
        });
    }
    async publishIncidentStateChanged(incidentId, from, to) {
        await this.notify({
            eventId: Math.random().toString(36).substr(2, 9),
            eventType: alert_events_1.EventType.INCIDENT_STATE_CHANGED,
            timestamp: new Date().toISOString(),
            payload: { incidentId, previousState: from, newState: to },
        });
    }
    async publishResponseActionExecuted(incidentId, actionType, outcome) {
        await this.notify({
            eventId: Math.random().toString(36).substr(2, 9),
            eventType: alert_events_1.EventType.RESPONSE_ACTION_EXECUTED,
            timestamp: new Date().toISOString(),
            payload: { incidentId, actionType, outcome },
        });
    }
}
exports.EventBusPublisher = EventBusPublisher;
//# sourceMappingURL=event-bus.publisher.js.map