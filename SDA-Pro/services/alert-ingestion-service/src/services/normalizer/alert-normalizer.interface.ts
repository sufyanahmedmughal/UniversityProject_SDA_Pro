// PATTERN: Factory Method — Product interface
import { CanonicalAlert, AlertSourceType } from '../../../../../shared/contracts/alert.contract';

export interface AlertNormalizer {
    normalize(rawPayload: any): CanonicalAlert;
    supports(sourceType: AlertSourceType): boolean;
}