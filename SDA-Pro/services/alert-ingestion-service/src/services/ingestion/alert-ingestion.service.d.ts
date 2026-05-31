import { AlertRepository } from '../../repositories/alert.repository';
import { AlertEntity } from '../../domain/alert/alert.entity';
import { AlertSourceType } from '../../../../../shared/contracts/alert.contract';
export declare class AlertIngestionService {
    private alertRepo;
    private config;
    private eventBus;
    constructor(alertRepo: AlertRepository);
    ingestAlert(sourceType: AlertSourceType, rawPayload: any): Promise<any>;
    ingestCampaign(sourceType: AlertSourceType, payloads: any[], campaignName: string): Promise<any>;
    getAllAlerts(): Promise<AlertEntity[]>;
}
