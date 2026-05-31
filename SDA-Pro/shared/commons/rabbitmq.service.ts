import * as amqp from 'amqplib';

export class RabbitMQService {
    private connection: amqp.Connection | null = null;
    private channel: amqp.Channel | null = null;
    private url: string;

    constructor() {
        this.url = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
    }

    async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect(this.url);
            this.channel = await this.connection.createChannel();
            console.log('[RabbitMQ] Connected');
        } catch (err) {
            console.error('[RabbitMQ] Connection failed:', err);
        }
    }

    async publish(queue: string, message: any): Promise<void> {
        if (!this.channel) await this.connect();
        await this.channel!.assertQueue(queue, { durable: true });
        this.channel!.sendToQueue(
            queue,
            Buffer.from(JSON.stringify(message)),
            { persistent: true },
        );
        console.log(`[RabbitMQ] Published to ${queue}:`, message);
    }

    async consume(queue: string, handler: (msg: any) => Promise<void>): Promise<void> {
        if (!this.channel) await this.connect();
        await this.channel!.assertQueue(queue, { durable: true });

        this.channel!.consume(queue, async (msg) => {
            if (msg) {
                const content = JSON.parse(msg.content.toString());
                await handler(content);
                this.channel!.ack(msg);
            }
        });
        console.log(`[RabbitMQ] Consuming from: ${queue}`);
    }

    async close(): Promise<void> {
        await this.channel?.close();
        await this.connection?.close();
    }
}