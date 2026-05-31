"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrowdStrikeNormalizer = void 0;
const alert_contract_1 = require("../../../../../shared/contracts/alert.contract");
const uuid_1 = require("uuid");
class CrowdStrikeNormalizer {
    supports(sourceType) {
        return sourceType === alert_contract_1.AlertSourceType.CROWDSTRIKE;
    }
    normalize(raw) {
        return {
            id: (0, uuid_1.v4)(),
            sourceType: alert_contract_1.AlertSourceType.CROWDSTRIKE,
            severity: this.mapSeverity(raw.severity),
            timestamp: raw.created_timestamp || new Date().toISOString(),
            sourceIP: raw.device?.local_ip || '',
            destinationIP: raw.network_accesses?.[0]?.remote_address || '',
            description: raw.display_name || raw.description || '',
            rawPayload: raw,
        };
    }
    mapSeverity(val) {
        if (val >= 90)
            return alert_contract_1.Severity.CRITICAL;
        if (val >= 70)
            return alert_contract_1.Severity.HIGH;
        if (val >= 40)
            return alert_contract_1.Severity.MEDIUM;
        return alert_contract_1.Severity.LOW;
    }
}
exports.CrowdStrikeNormalizer = CrowdStrikeNormalizer;
//# sourceMappingURL=crowdstrike.normalizer.js.map