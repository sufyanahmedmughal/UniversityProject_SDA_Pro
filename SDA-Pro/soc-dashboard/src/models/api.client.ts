// MVC: Model — API client
import axios from 'axios';
import { Alert, Incident, ActionOutcome } from './types';

const SERVICES = {
  ingestion: 'http://localhost:3001/api',
  enrichment: 'http://localhost:3002/api',
  incident: 'http://localhost:3003/api',
  response: 'http://localhost:3004/api',
  threatIntel: 'http://localhost:3005/api',
  audit: 'http://localhost:3006/api',
};

// Alert APIs
export const AlertAPI = {
  getAll: async (): Promise<Alert[]> => {
    const res = await axios.get(`${SERVICES.ingestion}/ingest/alerts`);
    return res.data;
  },

  ingestSplunk: async (payload: any): Promise<any> => {
    const res = await axios.post(`${SERVICES.ingestion}/ingest/splunk`, payload);
    return res.data;
  },
};

// Incident APIs
export const IncidentAPI = {
  getAll: async (): Promise<Incident[]> => {
    const res = await axios.get(`${SERVICES.incident}/incidents`);
    return res.data;
  },

  getById: async (id: string): Promise<Incident> => {
    const res = await axios.get(`${SERVICES.incident}/incidents/${id}`);
    return res.data;
  },

  create: async (alertIds: string[], severity: string): Promise<Incident> => {
    const res = await axios.post(`${SERVICES.incident}/incidents`, { alertIds, severity });
    return res.data;
  },

  beginTriage: async (id: string, analystId: string): Promise<Incident> => {
    const res = await axios.post(`${SERVICES.incident}/incidents/${id}/triage`, { analystId });
    return res.data;
  },

  initiateContainment: async (id: string, actions: string[]): Promise<Incident> => {
    const res = await axios.post(`${SERVICES.incident}/incidents/${id}/containment`, { actions });
    return res.data;
  },

  beginEradication: async (id: string): Promise<Incident> => {
    const res = await axios.post(`${SERVICES.incident}/incidents/${id}/eradication`);
    return res.data;
  },

  beginRecovery: async (id: string): Promise<Incident> => {
    const res = await axios.post(`${SERVICES.incident}/incidents/${id}/recovery`);
    return res.data;
  },

  close: async (id: string): Promise<Incident> => {
    const res = await axios.post(`${SERVICES.incident}/incidents/${id}/close`);
    return res.data;
  },
};

// Response APIs
export const ResponseAPI = {
  execute: async (
    incidentId: string,
    severity: string,
    assetCriticality: string,
    targetIP: string,
  ): Promise<{ outcomes: ActionOutcome[] }> => {
    const res = await axios.post(
      `${SERVICES.response}/response/${incidentId}/execute`,
      { severity, assetCriticality, targetIP },
    );
    return res.data;
  },
};

// Audit APIs
export const AuditAPI = {
  getLogs: async (): Promise<any[]> => {
    const res = await axios.get(`${SERVICES.audit}/audit/logs`);
    return res.data;
  },
};