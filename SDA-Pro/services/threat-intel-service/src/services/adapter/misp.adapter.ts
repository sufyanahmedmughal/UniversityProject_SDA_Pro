// PATTERN: Adapter — Adaptee: MISP platform
import { ThreatIntelProvider, ReputationResult, IndicatorType, Verdict } from './threat-intel-provider.interface';

// MISP raw response shape (different from VirusTotal)
interface MISPResponse {
    Attribute: Array<{
        value: string;
        type: string;
        to_ids: boolean;
        Tag?: Array<{ name: string }>;
    }>;
    threat_level_id: string;
}

export class MISPAdapter implements ThreatIntelProvider {
    // PATTERN: Adapter — wraps MISP API format

    getProviderName(): string { return 'MISP'; }

    async checkReputation(indicator: string, type: IndicatorType): Promise<ReputationResult> {
        // Mock MISP response
        const mockMISP: MISPResponse = {
            Attribute: [
                {
                    value: indicator,
                    type: 'ip-src',
                    to_ids: true,
                    Tag: [{ name: 'tlp:red' }, { name: 'apt:fancy-bear' }],
                },
            ],
            threat_level_id: '1', // 1=High in MISP
        };

        return this.mapToCanonical(indicator, type, mockMISP);
    }

    // PATTERN: Adapter — MISP threat_level_id → canonical score
    private mapToCanonical(
        indicator: string,
        type: IndicatorType,
        raw: MISPResponse,
    ): ReputationResult {
        const threatLevel = parseInt(raw.threat_level_id);
        // MISP: 1=High, 2=Medium, 3=Low, 4=Undefined
        const scoreMap: Record<number, number> = { 1: 90, 2: 60, 3: 30, 4: 10 };
        const score = scoreMap[threatLevel] ?? 10;

        const tags = raw.Attribute.flatMap(a => a.Tag?.map(t => t.name) || []);

        return {
            indicator,
            indicatorType: type,
            score,
            verdict: score >= 70 ? Verdict.MALICIOUS : score >= 40 ? Verdict.SUSPICIOUS : Verdict.CLEAN,
            source: 'MISP',
            tags,
            checkedAt: new Date().toISOString(),
        };
    }
}