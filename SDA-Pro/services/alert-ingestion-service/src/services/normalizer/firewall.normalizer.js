"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirewallNormalizer = void 0;
const alert_contract_1 = require("../../../../../shared/contracts/alert.contract");
const uuid_1 = require("uuid");
class FirewallNormalizer {
    supports(sourceType) {
        return sourceType === alert_contract_1.AlertSourceType.FIREWALL;
    }
    normalize(raw) {
        return {
            id: (0, uuid_1.v4)(),
            sourceType: alert_contract_1.AlertSourceType.FIREWALL,
            severity: raw.severity?.toUpperCase() || alert_contract_1.Severity.MEDIUM,
            timestamp: raw.timestamp || new Date().toISOString(),
            sourceIP: raw.src_ip || raw.source || '',
            destinationIP: raw.dst_ip || raw.destination || '',
            description: raw.message || raw.event_type || 'Firewall Alert',
            rawPayload: raw,
        };
    }
}
exports.FirewallNormalizer = FirewallNormalizer;
//# sourceMappingURL=firewall.normalizer.js.map