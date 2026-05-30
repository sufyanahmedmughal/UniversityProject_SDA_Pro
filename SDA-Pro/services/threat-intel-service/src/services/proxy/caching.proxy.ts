// PATTERN: Proxy — Caching Proxy
import { ThreatIntelProvider, ReputationResult, IndicatorType } from '../adapter/threat-intel-provider.interface';

export class CachingProxy implements ThreatIntelProvider {
    // In-memory cache (Redis integration in Step 7)
    private cache = new Map<string, { result: ReputationResult; expiresAt: number }>();
    private TTL_MS = 60 * 60 * 1000; // 1 hour

    constructor(private realProvider: ThreatIntelProvider) { }

    getProviderName(): string {
        return `CachingProxy(${this.realProvider.getProviderName()})`;
    }

    async checkReputation(indicator: string, type: IndicatorType): Promise<ReputationResult> {
        const cacheKey = `${type}:${indicator}`;

        // Check cache first
        const cached = this.cache.get(cacheKey);
        if (cached && cached.expiresAt > Date.now()) {
            console.log(`[CachingProxy] Cache HIT for ${cacheKey}`);
            return cached.result;
        }

        console.log(`[CachingProxy] Cache MISS for ${cacheKey} — calling real provider`);
        const result = await this.realProvider.checkReputation(indicator, type);

        // Store in cache
        this.cache.set(cacheKey, {
            result,
            expiresAt: Date.now() + this.TTL_MS,
        });

        return result;
    }
}