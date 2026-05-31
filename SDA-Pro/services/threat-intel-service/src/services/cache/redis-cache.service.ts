import Redis from 'ioredis';

export class RedisCacheService {
    private client: Redis;
    private TTL_SECONDS = 3600; // 1 hour

    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: 6379,
        });

        this.client.on('connect', () => console.log('[Redis] Connected'));
        this.client.on('error', (err) => console.error('[Redis] Error:', err));
    }

    async get(key: string): Promise<any | null> {
        const val = await this.client.get(key);
        if (!val) return null;
        return JSON.parse(val);
    }

    async set(key: string, value: any): Promise<void> {
        await this.client.setex(key, this.TTL_SECONDS, JSON.stringify(value));
    }

    async delete(key: string): Promise<void> {
        await this.client.del(key);
    }

    async exists(key: string): Promise<boolean> {
        const result = await this.client.exists(key);
        return result === 1;
    }
}