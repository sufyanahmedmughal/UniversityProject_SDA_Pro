// PATTERN: Factory Method — Creator
import { AlertNormalizer } from './alert-normalizer.interface';
import { AlertSourceType } from '../../../../../shared/contracts/alert.contract';
import { SplunkNormalizer } from './splunk.normalizer';
import { CrowdStrikeNormalizer } from './crowdstrike.normalizer';
import { FirewallNormalizer } from './firewall.normalizer';

export class AlertNormalizerFactory {
    private static normalizers: Map<AlertSourceType, AlertNormalizer> = new Map([
        [AlertSourceType.SPLUNK, new SplunkNormalizer()],
        [AlertSourceType.CROWDSTRIKE, new CrowdStrikeNormalizer()],
        [AlertSourceType.FIREWALL, new FirewallNormalizer()],
    ]);

    static register(type: AlertSourceType, normalizer: AlertNormalizer): void {
        this.normalizers.set(type, normalizer);
    }

    static createNormalizer(sourceType: AlertSourceType): AlertNormalizer {
        const normalizer = this.normalizers.get(sourceType);
        if (!normalizer) throw new Error(`No normalizer for: ${sourceType}`);
        return normalizer;
    }
}