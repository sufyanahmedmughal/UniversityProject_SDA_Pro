// PATTERN: State — State interface
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';

export interface IncidentState {
    getName(): string;
    getAllowedActions(): ResponseActionType[];
    beginTriage(incident: any, analystId: string): void;
    initiateContainment(incident: any, actions: ResponseActionType[]): void;
    beginEradication(incident: any): void;
    beginRecovery(incident: any): void;
    beginPostReview(incident: any): void;
    close(incident: any): void;
    escalate(incident: any, reason: string): void;
}