"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionConfigManager = void 0;
class IngestionConfigManager {
    constructor() {
        this.sources = [
            { type: 'SPLUNK', enabled: true, endpoint: '/ingest/splunk' },
            { type: 'CROWDSTRIKE', enabled: true, endpoint: '/ingest/crowdstrike' },
            { type: 'FIREWALL', enabled: true, endpoint: '/ingest/firewall', pollIntervalMs: 30000 },
        ];
    }
    static getInstance() {
        if (!IngestionConfigManager.instance) {
            IngestionConfigManager.instance = new IngestionConfigManager();
        }
        return IngestionConfigManager.instance;
    }
    getSourceConfig(type) {
        return this.sources.find(s => s.type === type);
    }
    isIngestionEnabled(type) {
        return this.sources.find(s => s.type === type)?.enabled ?? false;
    }
    getAllSources() {
        return this.sources;
    }
}
exports.IngestionConfigManager = IngestionConfigManager;
//# sourceMappingURL=ingestion-config.manager.js.map