// PATTERN: Factory Method — Concrete Product
import { AlertNormalizer } from './alert-normalizer.interface';
import { CanonicalAlert, AlertSourceType, Severity } from '../../../../../shared/contracts/alert.contract';
import { v4 as uuidv4 } from 'uuid';

export class FirewallNormalizer implements AlertNormalizer {
    supports(sourceType: AlertSourceType): boolean {
        return sourceType === AlertSourceType.FIREWALL;
    }

    normalize(raw: any): CanonicalAlert {
        return {
            id: uuidv4(),
            sourceType: AlertSourceType.FIREWALL,
            severity: raw.severity?.toUpperCase() as Severity || Severity.MEDIUM,
            timestamp: raw.timestamp || new Date().toISOString(),
            sourceIP: raw.src_ip || raw.source || '',
            destinationIP: raw.dst_ip || raw.destination || '',
            description: raw.message || raw.event_type || 'Firewall Alert',
            rawPayload: raw,
        };
    }
}