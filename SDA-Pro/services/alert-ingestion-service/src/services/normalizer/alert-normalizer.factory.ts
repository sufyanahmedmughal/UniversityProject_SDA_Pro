// PATTERN: Factory Method — Creator
import { AlertNormalizer } from './alert-normalizer.interface';
import { AlertSourceType } from '../../../../../shared/contracts/alert.contract';
import { SplunkNormalizer } from './splunk.normalizer';
import { CrowdStrikeNormalizer } from './crowdstrike.normalizer';

export class AlertNormalizerFactory {
    // PATTERN: Singleton registry
    private static normalizers: Map<AlertSourceType, AlertNormalizer> = new Map([
        [AlertSourceType.SPLUNK, new SplunkNormalizer()],
        [AlertSourceType.CROWDSTRIKE, new CrowdStrikeNormalizer()],
    ]);

    static register(type: AlertSourceType, normalizer: AlertNormalizer): void {
        this.normalizers.set(type, normalizer);
    }

    static createNormalizer(sourceType: AlertSourceType): AlertNormalizer {
        const normalizer = this.normalizers.get(sourceType);
        if (!normalizer) {
            throw new Error(`No normalizer for source: ${sourceType}`);
        }
        return normalizer;
    }
}