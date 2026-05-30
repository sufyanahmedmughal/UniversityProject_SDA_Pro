// PATTERN: Adapter — Target interface
export enum IndicatorType {
    IP_ADDRESS = 'IP_ADDRESS',
    DOMAIN = 'DOMAIN',
    FILE_HASH = 'FILE_HASH',
}

export enum Verdict {
    CLEAN = 'CLEAN',
    SUSPICIOUS = 'SUSPICIOUS',
    MALICIOUS = 'MALICIOUS',
    UNKNOWN = 'UNKNOWN',
}

export interface ReputationResult {
    indicator: string;
    indicatorType: IndicatorType;
    score: number;       // 0-100, higher = more malicious
    verdict: Verdict;
    source: string;
    tags: string[];
    checkedAt: string;
}

export interface ThreatIntelProvider {
    checkReputation(indicator: string, type: IndicatorType): Promise<ReputationResult>;
    getProviderName(): string;
}