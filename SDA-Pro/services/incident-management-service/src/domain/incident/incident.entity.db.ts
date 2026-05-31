import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('incidents')
export class IncidentEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    state: string;

    @Column()
    severity: string;

    @Column({ type: 'jsonb' })
    affectedAlertIds: string[];

    @Column({ nullable: true })
    assignedAnalystId: string;

    @Column({ type: 'jsonb', nullable: true })
    plannedActions: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}