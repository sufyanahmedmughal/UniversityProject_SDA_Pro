export declare class AlertEntity {
    id: string;
    sourceType: string;
    severity: string;
    sourceIP: string;
    destinationIP: string;
    description: string;
    rawPayload: any;
    enrichmentData: any;
    createdAt: Date;
}
