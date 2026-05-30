// Same as ingestion service — shared interface
import { Severity } from '../../../../../shared/contracts/alert.contract';

export interface AlertComponent {
    getId(): string;
    getSeverity(): Severity;
    getTimestamp(): string;
    getChildren(): AlertComponent[];
    isLeaf(): boolean;
}