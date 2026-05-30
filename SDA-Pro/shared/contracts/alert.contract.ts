export enum AlertSourceType {
    SPLUNK = 'SPLUNK',
    CROWDSTRIKE = 'CROWDSTRIKE',
    FIREWALL = 'FIREWALL',
    CLOUD_SIEM = 'CLOUD_SIEM',
}

export enum Severity {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL',
}

export enum IndicatorType {
    IP_ADDRESS = 'IP_ADDRESS',
    DOMAIN = 'DOMAIN',
    FILE_HASH = 'FILE_HASH',
    URL = 'URL',
}

// PATTERN: Composite — base interface for Alert, AlertCampaign, IncidentCluster
export interface CanonicalAlert {
    id: string;
    sourceType: AlertSourceType;
    severity: Severity;
    timestamp: string;
    sourceIP: string;
    destinationIP: string;
    description: string;
    rawPayload: any;
    enrichmentData?: EnrichmentData;
}

export interface EnrichmentData {
    geoLocation?: GeoData;
    reputationScore?: number;
    verdict?: string;
    assetCriticality?: string;
    userIdentity?: string;
}

export interface GeoData {
    country: string;
    city: string;
    latitude: number;
    longitude: number;
}