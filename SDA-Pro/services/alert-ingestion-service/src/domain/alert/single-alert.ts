// PATTERN: Composite — Leaf node
import { AlertComponent } from './alert-component.interface';
import { CanonicalAlert, Severity } from '../../../../../shared/contracts/alert.contract';

export class SingleAlert implements AlertComponent {
    constructor(private data: CanonicalAlert) { }

    getId(): string { return this.data.id; }
    getSeverity(): Severity { return this.data.severity; }
    getTimestamp(): string { return this.data.timestamp; }
    getData(): CanonicalAlert { return this.data; }
    getChildren(): AlertComponent[] { return []; }
    add(_: AlertComponent): void { throw new Error('Leaf node'); }
    remove(_: AlertComponent): void { throw new Error('Leaf node'); }
    isLeaf(): boolean { return true; }
}