import { AlertIngestionService } from '../services/ingestion/alert-ingestion.service';
import { AlertSourceType } from '../../../../shared/contracts/alert.contract';
export declare class AlertIngestionController {
    private ingestionService;
    constructor(ingestionService: AlertIngestionService);
    ingestSplunk(payload: any): Promise<any>;
    ingestCrowdStrike(payload: any): Promise<any>;
    ingestFirewall(payload: any): Promise<any>;
    ingestCampaign(body: {
        sourceType: AlertSourceType;
        payloads: any[];
        campaignName: string;
    }): Promise<any>;
    getAllAlerts(): Promise<import("../domain/alert/alert.entity").AlertEntity[]>;
}
