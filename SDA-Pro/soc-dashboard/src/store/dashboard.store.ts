// MVC: Model — application state
import { create } from 'zustand';
import { Alert, Incident, DashboardMetrics } from '../models/types';
import { AlertAPI, IncidentAPI } from '../models/api.client';

interface DashboardStore {
  // State
  alerts: Alert[];
  incidents: Incident[];
  metrics: DashboardMetrics;
  loading: boolean;
  error: string | null;
  selectedIncident: Incident | null;

  // Actions
  loadAlerts: () => Promise<void>;
  loadIncidents: () => Promise<void>;
  setSelectedIncident: (incident: Incident | null) => void;
  addLiveAlert: (alert: Alert) => void;
  updateLiveIncident: (incident: Incident) => void;
  computeMetrics: () => void;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  alerts: [],
  incidents: [],
  metrics: {
    totalAlerts: 0,
    totalIncidents: 0,
    openIncidents: 0,
    criticalIncidents: 0,
    resolvedToday: 0,
  },
  loading: false,
  error: null,
  selectedIncident: null,

  loadAlerts: async () => {
    set({ loading: true });
    try {
      const alerts = await AlertAPI.getAll();
      set({ alerts, loading: false });
      get().computeMetrics();
    } catch (err) {
      set({ error: 'Failed to load alerts', loading: false });
    }
  },

  loadIncidents: async () => {
    set({ loading: true });
    try {
      const incidents = await IncidentAPI.getAll();
      set({ incidents, loading: false });
      get().computeMetrics();
    } catch (err) {
      set({ error: 'Failed to load incidents', loading: false });
    }
  },

  setSelectedIncident: (incident) => set({ selectedIncident: incident }),

  // PATTERN: Observer — called when WebSocket pushes new alert
  addLiveAlert: (alert) => {
    set(state => ({ alerts: [alert, ...state.alerts] }));
    get().computeMetrics();
  },

  // PATTERN: Observer — called when WebSocket pushes incident update
  updateLiveIncident: (incident) => {
    set(state => ({
      incidents: state.incidents.map(i => i.id === incident.id ? incident : i),
    }));
    get().computeMetrics();
  },

  computeMetrics: () => {
    const { alerts, incidents } = get();
    const today = new Date().toDateString();
    set({
      metrics: {
        totalAlerts: alerts.length,
        totalIncidents: incidents.length,
        openIncidents: incidents.filter(i => i.state !== 'CLOSED').length,
        criticalIncidents: incidents.filter(i => i.severity === 'CRITICAL').length,
        resolvedToday: incidents.filter(
          i => i.state === 'CLOSED' && new Date(i.updatedAt).toDateString() === today
        ).length,
      },
    });
  },
}));