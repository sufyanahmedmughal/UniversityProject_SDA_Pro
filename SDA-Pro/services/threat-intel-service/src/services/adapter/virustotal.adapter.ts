// PATTERN: Adapter — Adaptee: VirusTotal external API
import { ThreatIntelProvider, ReputationResult, IndicatorType, Verdict } from './threat-intel-provider.interface';

// Simulates VirusTotal raw API response shape
interface VirusTotalResponse {
    data: {
        attributes: {
            last_analysis_stats: {
                malicious: number;
                suspicious: number;
                harmless: number;
                undetected: number;
            };
            tags?: string[];
        };
    };
}

export class VirusTotalAdapter implements ThreatIntelProvider {
    // PATTERN: Adapter — wraps external VirusTotal API

    getProviderName(): string { return 'VirusTotal'; }

    async checkReputation(indicator: string, type: IndicatorType): Promise<ReputationResult> {
        // Real impl: call https://www.virustotal.com/api/v3/
        // Mock for semester project
        const mockVTResponse: VirusTotalResponse = {
            data: {
                attributes: {
                    last_analysis_stats: {
                        malicious: 45,
                        suspicious: 5,
                        harmless: 10,
                        undetected: 12,
                    },
                    tags: ['APT29', 'ransomware'],
                },
            },
        };

        return this.mapToCanonical(indicator, type, mockVTResponse);
    }

    // PATTERN: Adapter — mapping external format to canonical
    private mapToCanonical(
        indicator: string,
        type: IndicatorType,
        raw: VirusTotalResponse,
    ): ReputationResult {
        const stats = raw.data.attributes.last_analysis_stats;
        const total = stats.malicious + stats.suspicious + stats.harmless + stats.undetected;
        const score = Math.round(((stats.malicious + stats.suspicious) / total) * 100);

        let verdict = Verdict.UNKNOWN;
        if (score >= 70) verdict = Verdict.MALICIOUS;
        else if (score >= 40) verdict = Verdict.SUSPICIOUS;
        else if (score < 20) verdict = Verdict.CLEAN;

        return {
            indicator,
            indicatorType: type,
            score,
            verdict,
            source: 'VirusTotal',
            tags: raw.data.attributes.tags || [],
            checkedAt: new Date().toISOString(),
        };
    }
}