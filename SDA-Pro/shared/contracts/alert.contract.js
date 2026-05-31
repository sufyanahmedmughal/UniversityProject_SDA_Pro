"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorType = exports.Severity = exports.AlertSourceType = void 0;
var AlertSourceType;
(function (AlertSourceType) {
    AlertSourceType["SPLUNK"] = "SPLUNK";
    AlertSourceType["CROWDSTRIKE"] = "CROWDSTRIKE";
    AlertSourceType["FIREWALL"] = "FIREWALL";
    AlertSourceType["CLOUD_SIEM"] = "CLOUD_SIEM";
})(AlertSourceType || (exports.AlertSourceType = AlertSourceType = {}));
var Severity;
(function (Severity) {
    Severity["LOW"] = "LOW";
    Severity["MEDIUM"] = "MEDIUM";
    Severity["HIGH"] = "HIGH";
    Severity["CRITICAL"] = "CRITICAL";
})(Severity || (exports.Severity = Severity = {}));
var IndicatorType;
(function (IndicatorType) {
    IndicatorType["IP_ADDRESS"] = "IP_ADDRESS";
    IndicatorType["DOMAIN"] = "DOMAIN";
    IndicatorType["FILE_HASH"] = "FILE_HASH";
    IndicatorType["URL"] = "URL";
})(IndicatorType || (exports.IndicatorType = IndicatorType = {}));
//# sourceMappingURL=alert.contract.js.map