// PATTERN: Proxy — same interface as real provider
import { ThreatIntelProvider } from '../adapter/threat-intel-provider.interface';

export interface ThreatIntelProxy extends ThreatIntelProvider { }