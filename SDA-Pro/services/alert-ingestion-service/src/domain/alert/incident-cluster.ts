// PATTERN: Composite — Another composite node (correlated alerts)
import { AlertComponent } from './alert-component.interface';
import { Severity } from '../../../../../shared/contracts/alert.contract';

export class IncidentCluster implements AlertComponent {
    private children: AlertComponent[] = [];

    constructor(
        private id: string,
        private correlationRule: string,
    ) { }

    getId(): string { return this.id; }
    getCorrelationRule(): string { return this.correlationRule; }

    getSeverity(): Severity {
        if (this.children.length === 0) return Severity.LOW;
        return this.children[0].getSeverity();
    }

    getTimestamp(): string { return new Date().toISOString(); }
    getChildren(): AlertComponent[] { return this.children; }
    add(c: AlertComponent): void { this.children.push(c); }
    remove(c: AlertComponent): void {
        this.children = this.children.filter(x => x.getId() !== c.getId());
    }
    isLeaf(): boolean { return false; }
}