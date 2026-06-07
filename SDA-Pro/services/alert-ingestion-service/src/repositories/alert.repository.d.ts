import { Repository } from 'typeorm';
import { AlertEntity } from '../domain/alert/alert.entity';
export declare class AlertRepository {
    private repo;
    constructor(repo: Repository<AlertEntity>);
    save(alert: AlertEntity): Promise<AlertEntity>;
    findById(id: string): Promise<AlertEntity | null>;
    findAll(): Promise<AlertEntity[]>;
    findBySeverity(severity: string): Promise<AlertEntity[]>;
}
