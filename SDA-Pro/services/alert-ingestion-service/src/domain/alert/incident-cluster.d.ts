import { AlertComponent } from './alert-component.interface';
import { Severity } from '../../../../../shared/contracts/alert.contract';
export declare class IncidentCluster implements AlertComponent {
    private id;
    private correlationRule;
    private children;
    constructor(id: string, correlationRule: string);
    getId(): string;
    getCorrelationRule(): string;
    getSeverity(): Severity;
    getTimestamp(): string;
    getChildren(): AlertComponent[];
    add(c: AlertComponent): void;
    remove(c: AlertComponent): void;
    isLeaf(): boolean;
}
