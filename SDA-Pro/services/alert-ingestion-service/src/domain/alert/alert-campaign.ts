// PATTERN: Composite — Composite node (multi-stage attack campaign)
import { AlertComponent } from './alert-component.interface';
import { Severity } from '../../../../../shared/contracts/alert.contract';

export class AlertCampaign implements AlertComponent {
    private children: AlertComponent[] = [];

    constructor(
        private id: string,
        private campaignName: string,
        private attackPattern: string,
    ) { }

    getId(): string { return this.id; }
    getCampaignName(): string { return this.campaignName; }

    getSeverity(): Severity {
        // Returns max severity among children
        const order = [Severity.LOW, Severity.MEDIUM, Severity.HIGH, Severity.CRITICAL];
        let max = Severity.LOW;
        for (const child of this.children) {
            if (order.indexOf(child.getSeverity()) > order.indexOf(max)) {
                max = child.getSeverity();
            }
        }
        return max;
    }

    getTimestamp(): string { return new Date().toISOString(); }
    getChildren(): AlertComponent[] { return this.children; }
    add(component: AlertComponent): void { this.children.push(component); }
    remove(component: AlertComponent): void {
        this.children = this.children.filter(c => c.getId() !== component.getId());
    }
    isLeaf(): boolean { return false; }
}