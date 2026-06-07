import { AlertNormalizer } from './alert-normalizer.interface';
import { AlertSourceType } from '../../../../../shared/contracts/alert.contract';
export declare class AlertNormalizerFactory {
    private static normalizers;
    static register(type: AlertSourceType, normalizer: AlertNormalizer): void;
    static createNormalizer(sourceType: AlertSourceType): AlertNormalizer;
}
