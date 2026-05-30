// Builds layered proxy: AccessControl → RateLimit → Cache → RealProvider
import { ThreatIntelProvider } from '../adapter/threat-intel-provider.interface';
import { CachingProxy } from './caching.proxy';
import { RateLimitProxy } from './rate-limit.proxy';
import { AccessControlProxy } from './access-control.proxy';

export class ProxyChainBuilder {
    static build(realProvider: ThreatIntelProvider): ThreatIntelProvider {
        const withCache = new CachingProxy(realProvider);
        const withRateLimit = new RateLimitProxy(withCache);
        const withAccess = new AccessControlProxy(withRateLimit);
        return withAccess;
    }
}