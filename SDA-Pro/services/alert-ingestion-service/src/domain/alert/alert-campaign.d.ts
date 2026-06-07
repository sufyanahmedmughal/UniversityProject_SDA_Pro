import { AlertComponent } from './alert-component.interface';
import { Severity } from '../../../../../shared/contracts/alert.contract';
export declare class AlertCampaign implements AlertComponent {
    private id;
    private campaignName;
    private attackPattern;
    private children;
    constructor(id: string, campaignName: string, attackPattern: string);
    getId(): string;
    getCampaignName(): string;
    getSeverity(): Severity;
    getTimestamp(): string;
    getChildren(): AlertComponent[];
    add(component: AlertComponent): void;
    remove(component: AlertComponent): void;
    isLeaf(): boolean;
}
