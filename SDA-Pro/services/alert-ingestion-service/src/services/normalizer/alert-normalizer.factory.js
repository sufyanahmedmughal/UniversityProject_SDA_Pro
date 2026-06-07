"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertNormalizerFactory = void 0;
const alert_contract_1 = require("../../../../../shared/contracts/alert.contract");
const splunk_normalizer_1 = require("./splunk.normalizer");
const crowdstrike_normalizer_1 = require("./crowdstrike.normalizer");
const firewall_normalizer_1 = require("./firewall.normalizer");
class AlertNormalizerFactory {
    static register(type, normalizer) {
        this.normalizers.set(type, normalizer);
    }
    static createNormalizer(sourceType) {
        const normalizer = this.normalizers.get(sourceType);
        if (!normalizer)
            throw new Error(`No normalizer for: ${sourceType}`);
        return normalizer;
    }
}
exports.AlertNormalizerFactory = AlertNormalizerFactory;
AlertNormalizerFactory.normalizers = new Map([
    [alert_contract_1.AlertSourceType.SPLUNK, new splunk_normalizer_1.SplunkNormalizer()],
    [alert_contract_1.AlertSourceType.CROWDSTRIKE, new crowdstrike_normalizer_1.CrowdStrikeNormalizer()],
    [alert_contract_1.AlertSourceType.FIREWALL, new firewall_normalizer_1.FirewallNormalizer()],
]);
//# sourceMappingURL=alert-normalizer.factory.js.map