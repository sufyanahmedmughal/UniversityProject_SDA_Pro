import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncidentEntity } from '../domain/incident/incident.entity.db';

@Injectable()
export class IncidentRepository {
    constructor(
        @InjectRepository(IncidentEntity)
        private repo: Repository<IncidentEntity>,
    ) { }

    async save(incident: IncidentEntity): Promise<IncidentEntity> {
        return this.repo.save(incident);
    }

    async findById(id: string): Promise<IncidentEntity | null> {
        return this.repo.findOne({ where: { id } });
    }

    async findAll(): Promise<IncidentEntity[]> {
        return this.repo.find({ order: { createdAt: 'DESC' } });
    }

    async findByState(state: string): Promise<IncidentEntity[]> {
        return this.repo.find({ where: { state } });
    }

    async updateState(id: string, state: string): Promise<void> {
        await this.repo.update(id, { state });
    }
}