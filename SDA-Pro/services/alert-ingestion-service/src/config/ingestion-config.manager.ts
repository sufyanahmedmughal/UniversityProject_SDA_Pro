// PATTERN: Singleton
export interface AlertSourceConfig {
    type: string;
    enabled: boolean;
    endpoint: string;
    pollIntervalMs?: number;
}

export class IngestionConfigManager {
    // PATTERN: Singleton — single instance
    private static instance: IngestionConfigManager;

    private sources: AlertSourceConfig[] = [
        { type: 'SPLUNK', enabled: true, endpoint: '/ingest/splunk' },
        { type: 'CROWDSTRIKE', enabled: true, endpoint: '/ingest/crowdstrike' },
        { type: 'FIREWALL', enabled: true, endpoint: '/ingest/firewall', pollIntervalMs: 30000 },
    ];

    private constructor() { }

    static getInstance(): IngestionConfigManager {
        if (!IngestionConfigManager.instance) {
            IngestionConfigManager.instance = new IngestionConfigManager();
        }
        return IngestionConfigManager.instance;
    }

    getSourceConfig(type: string): AlertSourceConfig | undefined {
        return this.sources.find(s => s.type === type);
    }

    isIngestionEnabled(type: string): boolean {
        return this.sources.find(s => s.type === type)?.enabled ?? false;
    }

    getAllSources(): AlertSourceConfig[] {
        return this.sources;
    }
}