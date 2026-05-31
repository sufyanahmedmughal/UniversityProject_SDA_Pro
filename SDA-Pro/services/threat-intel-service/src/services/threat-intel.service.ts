import { Injectable } from '@nestjs/common';
import { VirusTotalAdapter } from './adapter/virustotal.adapter';
import { MISPAdapter } from './adapter/misp.adapter';
import { ProxyChainBuilder } from './proxy/proxy-chain.builder';
import { IndicatorType } from './adapter/threat-intel-provider.interface';

@Injectable()
export class ThreatIntelService {
    // PATTERN: Proxy — wrap adapters in proxy chain
    private vtProvider = ProxyChainBuilder.build(new VirusTotalAdapter());
    private mispProvider = ProxyChainBuilder.build(new MISPAdapter());

    async checkReputation(indicator: string, type: IndicatorType): Promise<any> {
        // Query both providers, return highest risk score
        const [vtResult, mispResult] = await Promise.allSettled([
            this.vtProvider.checkReputation(indicator, type),
            this.mispProvider.checkReputation(indicator, type),
        ]);

        const results = [];
        if (vtResult.status === 'fulfilled') results.push(vtResult.value);
        if (mispResult.status === 'fulfilled') results.push(mispResult.value);

        // Return highest score result
        return results.sort((a, b) => b.score - a.score)[0];
    }
}