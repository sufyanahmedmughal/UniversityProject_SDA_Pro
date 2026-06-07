export interface AlertSourceConfig {
    type: string;
    enabled: boolean;
    endpoint: string;
    pollIntervalMs?: number;
}
export declare class IngestionConfigManager {
    private static instance;
    private sources;
    private constructor();
    static getInstance(): IngestionConfigManager;
    getSourceConfig(type: string): AlertSourceConfig | undefined;
    isIngestionEnabled(type: string): boolean;
    getAllSources(): AlertSourceConfig[];
}
