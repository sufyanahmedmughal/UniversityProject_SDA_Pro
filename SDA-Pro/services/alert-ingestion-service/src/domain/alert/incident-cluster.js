"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentCluster = void 0;
const alert_contract_1 = require("../../../../../shared/contracts/alert.contract");
class IncidentCluster {
    constructor(id, correlationRule) {
        this.id = id;
        this.correlationRule = correlationRule;
        this.children = [];
    }
    getId() { return this.id; }
    getCorrelationRule() { return this.correlationRule; }
    getSeverity() {
        if (this.children.length === 0)
            return alert_contract_1.Severity.LOW;
        return this.children[0].getSeverity();
    }
    getTimestamp() { return new Date().toISOString(); }
    getChildren() { return this.children; }
    add(c) { this.children.push(c); }
    remove(c) {
        this.children = this.children.filter(x => x.getId() !== c.getId());
    }
    isLeaf() { return false; }
}
exports.IncidentCluster = IncidentCluster;
//# sourceMappingURL=incident-cluster.js.map