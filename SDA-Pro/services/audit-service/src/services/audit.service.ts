import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditEntity } from '../repositories/audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEntity)
    private repo: Repository<AuditEntity>,
  ) {}

  async log(eventType: string, eventId: string, payload: any): Promise<void> {
    const entry = this.repo.create({
      id: Math.random().toString(36).substr(2, 9),
      eventType,
      eventId,
      payload,
      immutable: true,
    });
    await this.repo.save(entry);
    console.log(`[AuditService] Logged: ${eventType}`);
  }

  async getAll(): Promise<AuditEntity[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async getByEventType(eventType: string): Promise<AuditEntity[]> {
    return this.repo.find({ where: { eventType } });
  }
}