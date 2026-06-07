// PATTERN: Proxy — Redis-backed Caching Proxy
import { ThreatIntelProvider, ReputationResult, IndicatorType } from '../adapter/threat-intel-provider.interface';
import { RedisCacheService } from '../cache/redis-cache.service';

export class CachingProxy implements ThreatIntelProvider {
    private cache: RedisCacheService;

    constructor(private realProvider: ThreatIntelProvider) {
        this.cache = new RedisCacheService();
    }

    getProviderName(): string {
        return `CachingProxy(${this.realProvider.getProviderName()})`;
    }

    async checkReputation(indicator: string, type: IndicatorType): Promise<ReputationResult> {
        const cacheKey = `threatintel:${type}:${indicator}`;

        const cached = await this.cache.get(cacheKey);
        if (cached) {
            console.log(`[CachingProxy] Redis HIT: ${cacheKey}`);
            return cached;
        }

        console.log(`[CachingProxy] Redis MISS: ${cacheKey}`);
        const result = await this.realProvider.checkReputation(indicator, type);
        await this.cache.set(cacheKey, result);
        return result;
    }
}