// PATTERN: Factory Method — Concrete Product
import { AlertNormalizer } from './alert-normalizer.interface';
import { CanonicalAlert, AlertSourceType, Severity } from '../../../../../shared/contracts/alert.contract';
import { v4 as uuidv4 } from 'uuid';

export class CrowdStrikeNormalizer implements AlertNormalizer {
    supports(sourceType: AlertSourceType): boolean {
        return sourceType === AlertSourceType.CROWDSTRIKE;
    }

    normalize(raw: any): CanonicalAlert {
        return {
            id: uuidv4(),
            sourceType: AlertSourceType.CROWDSTRIKE,
            severity: this.mapSeverity(raw.severity),
            timestamp: raw.created_timestamp || new Date().toISOString(),
            sourceIP: raw.device?.local_ip || '',
            destinationIP: raw.network_accesses?.[0]?.remote_address || '',
            description: raw.display_name || raw.description || '',
            rawPayload: raw,
        };
    }

    private mapSeverity(val: number): Severity {
        if (val >= 90) return Severity.CRITICAL;
        if (val >= 70) return Severity.HIGH;
        if (val >= 40) return Severity.MEDIUM;
        return Severity.LOW;
    }
}