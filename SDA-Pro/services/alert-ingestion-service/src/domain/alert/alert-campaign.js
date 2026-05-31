"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertCampaign = void 0;
const alert_contract_1 = require("../../../../../shared/contracts/alert.contract");
class AlertCampaign {
    constructor(id, campaignName, attackPattern) {
        this.id = id;
        this.campaignName = campaignName;
        this.attackPattern = attackPattern;
        this.children = [];
    }
    getId() { return this.id; }
    getCampaignName() { return this.campaignName; }
    getSeverity() {
        const order = [alert_contract_1.Severity.LOW, alert_contract_1.Severity.MEDIUM, alert_contract_1.Severity.HIGH, alert_contract_1.Severity.CRITICAL];
        let max = alert_contract_1.Severity.LOW;
        for (const child of this.children) {
            if (order.indexOf(child.getSeverity()) > order.indexOf(max)) {
                max = child.getSeverity();
            }
        }
        return max;
    }
    getTimestamp() { return new Date().toISOString(); }
    getChildren() { return this.children; }
    add(component) { this.children.push(component); }
    remove(component) {
        this.children = this.children.filter(c => c.getId() !== component.getId());
    }
    isLeaf() { return false; }
}
exports.AlertCampaign = AlertCampaign;
//# sourceMappingURL=alert-campaign.js.map