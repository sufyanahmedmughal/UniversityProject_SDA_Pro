import { AlertComponent } from './alert-component.interface';
import { CanonicalAlert, Severity } from '../../../../../shared/contracts/alert.contract';
export declare class SingleAlert implements AlertComponent {
    private data;
    constructor(data: CanonicalAlert);
    getId(): string;
    getSeverity(): Severity;
    getTimestamp(): string;
    getData(): CanonicalAlert;
    getChildren(): AlertComponent[];
    add(_: AlertComponent): void;
    remove(_: AlertComponent): void;
    isLeaf(): boolean;
}
