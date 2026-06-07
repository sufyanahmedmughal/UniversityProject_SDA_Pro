// PATTERN: Strategy — Strategy interface
import { ResponseActionType } from '../../../../../shared/contracts/incident.contract';

export interface ResponseContext {
    incidentId: string;
    severity: string;
    assetCriticality: string;
    affectedAssetCount: number;
}

export interface ResponseStrategy {
    getName(): string;
    determineActions(context: ResponseContext): ResponseActionType[];
}