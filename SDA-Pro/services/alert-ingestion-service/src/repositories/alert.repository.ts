import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertEntity } from '../domain/alert/alert.entity';

@Injectable()
export class AlertRepository {
    constructor(
        @InjectRepository(AlertEntity)
        private repo: Repository<AlertEntity>,
    ) { }

    async save(alert: AlertEntity): Promise<AlertEntity> {
        return this.repo.save(alert);
    }

    async findById(id: string): Promise<AlertEntity | null> {
        return this.repo.findOne({ where: { id } });
    }

    async findAll(): Promise<AlertEntity[]> {
        return this.repo.find({ order: { createdAt: 'DESC' } });
    }

    async findBySeverity(severity: string): Promise<AlertEntity[]> {
        return this.repo.find({ where: { severity } });
    }
}