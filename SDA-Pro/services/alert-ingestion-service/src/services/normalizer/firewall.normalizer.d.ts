import { AlertNormalizer } from './alert-normalizer.interface';
import { CanonicalAlert, AlertSourceType } from '../../../../../shared/contracts/alert.contract';
export declare class FirewallNormalizer implements AlertNormalizer {
    supports(sourceType: AlertSourceType): boolean;
    normalize(raw: any): CanonicalAlert;
}
