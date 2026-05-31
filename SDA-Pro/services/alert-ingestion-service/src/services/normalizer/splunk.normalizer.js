"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplunkNormalizer = void 0;
const alert_contract_1 = require("../../../../../shared/contracts/alert.contract");
const uuid_1 = require("uuid");
class SplunkNormalizer {
    supports(sourceType) {
        return sourceType === alert_contract_1.AlertSourceType.SPLUNK;
    }
    normalize(raw) {
        return {
            id: (0, uuid_1.v4)(),
            sourceType: alert_contract_1.AlertSourceType.SPLUNK,
            severity: this.mapSeverity(raw.severity || raw.urgency),
            timestamp: raw.timestamp || new Date().toISOString(),
            sourceIP: raw.src_ip || raw.src || '',
            destinationIP: raw.dest_ip || raw.dest || '',
            description: raw.search_name || raw.message || '',
            rawPayload: raw,
        };
    }
    mapSeverity(val) {
        const map = {
            critical: alert_contract_1.Severity.CRITICAL,
            high: alert_contract_1.Severity.HIGH,
            medium: alert_contract_1.Severity.MEDIUM,
            low: alert_contract_1.Severity.LOW,
        };
        return map[val?.toLowerCase()] || alert_contract_1.Severity.MEDIUM;
    }
}
exports.SplunkNormalizer = SplunkNormalizer;
//# sourceMappingURL=splunk.normalizer.js.map