import { Severity } from '../../../../../shared/contracts/alert.contract';
export interface AlertComponent {
    getId(): string;
    getSeverity(): Severity;
    getTimestamp(): string;
    getChildren(): AlertComponent[];
    add(component: AlertComponent): void;
    remove(component: AlertComponent): void;
    isLeaf(): boolean;
}
