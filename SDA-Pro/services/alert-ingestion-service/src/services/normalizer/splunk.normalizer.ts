// PATTERN: Factory Method — Concrete Product
import { AlertNormalizer } from './alert-normalizer.interface';
import { CanonicalAlert, AlertSourceType, Severity } from '../../../../../shared/contracts/alert.contract';
import { v4 as uuidv4 } from 'uuid';

export class SplunkNormalizer implements AlertNormalizer {
    supports(sourceType: AlertSourceType): boolean {
        return sourceType === AlertSourceType.SPLUNK;
    }

    normalize(raw: any): CanonicalAlert {
        return {
            id: uuidv4(),
            sourceType: AlertSourceType.SPLUNK,
            severity: this.mapSeverity(raw.severity || raw.urgency),
            timestamp: raw.timestamp || new Date().toISOString(),
            sourceIP: raw.src_ip || raw.src || '',
            destinationIP: raw.dest_ip || raw.dest || '',
            description: raw.search_name || raw.message || '',
            rawPayload: raw,
        };
    }

    private mapSeverity(val: string): Severity {
        const map: any = {
            critical: Severity.CRITICAL,
            high: Severity.HIGH,
            medium: Severity.MEDIUM,
            low: Severity.LOW,
        };
        return map[val?.toLowerCase()] || Severity.MEDIUM;
    }
}