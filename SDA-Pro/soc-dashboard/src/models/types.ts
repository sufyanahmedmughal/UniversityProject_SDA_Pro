// MVC: Model — Data types/DTOs

export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum IncidentState {
  NEW = 'NEW',
  UNDER_TRIAGE = 'UNDER_TRIAGE',
  CONTAINMENT = 'CONTAINMENT',
  ERADICATION = 'ERADICATION',
  RECOVERY = 'RECOVERY',
  POST_INCIDENT_REVIEW = 'POST_INCIDENT_REVIEW',
  CLOSED = 'CLOSED',
}

export interface Alert {
  id: string;
  sourceType: string;
  severity: Severity;
  sourceIP: string;
  destinationIP: string;
  description: string;
  createdAt: string;
}

export interface Incident {
  id: string;
  state: IncidentState;
  severity: string;
  affectedAlertIds: string[];
  assignedAnalystId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActionOutcome {
  actionType: string;
  success: boolean;
  details: string;
  executedAt: string;
}

export interface DashboardMetrics {
  totalAlerts: number;
  totalIncidents: number;
  openIncidents: number;
  criticalIncidents: number;
  resolvedToday: number;
}