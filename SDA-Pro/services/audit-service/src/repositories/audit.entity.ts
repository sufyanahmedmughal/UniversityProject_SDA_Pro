import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  eventType: string;

  @Column()
  eventId: string;

  @Column({ type: 'jsonb' })
  payload: any;

  @Column({ default: true })
  immutable: boolean;

  @CreateDateColumn()
  createdAt: Date;
}