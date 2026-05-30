// PATTERN: Proxy — Access Control Proxy
import { ThreatIntelProvider, ReputationResult, IndicatorType } from '../adapter/threat-intel-provider.interface';
import { UnauthorizedActionError } from '../../../../../shared/commons/errors';

export class AccessControlProxy implements ThreatIntelProvider {
    private allowedRoles = ['SOC_ANALYST', 'SOC_ENGINEER', 'ADMIN'];

    constructor(private realProvider: ThreatIntelProvider) { }

    getProviderName(): string {
        return `AccessControlProxy(${this.realProvider.getProviderName()})`;
    }

    async checkReputation(
        indicator: string,
        type: IndicatorType,
        role: string = 'SOC_ANALYST',
    ): Promise<ReputationResult> {
        if (!this.allowedRoles.includes(role)) {
            throw new UnauthorizedActionError(`checkReputation — role: ${role}`);
        }
        console.log(`[AccessControlProxy] Access granted for role: ${role}`);
        return this.realProvider.checkReputation(indicator, type);
    }
}