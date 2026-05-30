// PATTERN: Proxy — Rate Limiting Proxy
import { ThreatIntelProvider, ReputationResult, IndicatorType } from '../adapter/threat-intel-provider.interface';

export class RateLimitProxy implements ThreatIntelProvider {
    private requestCount = 0;
    private windowStart = Date.now();
    private readonly MAX_REQUESTS = 100;
    private readonly WINDOW_MS = 60 * 1000; // 1 minute

    constructor(private realProvider: ThreatIntelProvider) { }

    getProviderName(): string {
        return `RateLimitProxy(${this.realProvider.getProviderName()})`;
    }

    async checkReputation(indicator: string, type: IndicatorType): Promise<ReputationResult> {
        // Reset window if expired
        if (Date.now() - this.windowStart > this.WINDOW_MS) {
            this.requestCount = 0;
            this.windowStart = Date.now();
        }

        if (this.requestCount >= this.MAX_REQUESTS) {
            throw new Error(`[RateLimitProxy] Rate limit exceeded for ${this.realProvider.getProviderName()}`);
        }

        this.requestCount++;
        console.log(`[RateLimitProxy] Request ${this.requestCount}/${this.MAX_REQUESTS}`);
        return this.realProvider.checkReputation(indicator, type);
    }
}