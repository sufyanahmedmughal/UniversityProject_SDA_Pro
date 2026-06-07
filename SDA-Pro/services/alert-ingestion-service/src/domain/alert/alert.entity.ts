import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('alerts')
export class AlertEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    sourceType: string;

    @Column()
    severity: string;

    @Column()
    sourceIP: string;

    @Column({ nullable: true })
    destinationIP: string;

    @Column('text')
    description: string;

    @Column({ type: 'jsonb' })
    rawPayload: any;

    @Column({ type: 'jsonb', nullable: true })
    enrichmentData: any;

    @CreateDateColumn()
    createdAt: Date;
}