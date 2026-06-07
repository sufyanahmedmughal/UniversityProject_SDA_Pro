// MVC: Controller — coordinates Models and Views
import React, { useEffect } from 'react';
import { useDashboardStore } from '../store/dashboard.store';
import { wsService } from '../services/websocket.service';
import MetricsBar from '../views/MetricsBar';
import AlertStream from '../views/AlertStream';
import IncidentQueue from '../views/IncidentQueue';
import ResponseConsole from '../views/ResponseConsole';
import { Incident } from '../models/types';

const AppController: React.FC = () => {
  const {
    alerts, incidents, metrics,
    loading, error,
    selectedIncident, setSelectedIncident,
    loadAlerts, loadIncidents,
  } = useDashboardStore();

  // MVC: Controller — init on mount
  useEffect(() => {
    loadAlerts();
    loadIncidents();
    // PATTERN: Observer — connect WebSocket
    wsService.connect();

    // Poll every 10s as fallback
    const interval = setInterval(() => {
      loadAlerts();
      loadIncidents();
    }, 10000);

    return () => {
      clearInterval(interval);
      wsService.disconnect();
    };
  }, []);

  const handleIncidentSelect = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  const handleIncidentUpdate = () => {
    loadIncidents();
  };

  return (
    <div style={{
      background: '#020617',
      minHeight: '100vh',
      color: '#f1f5f9',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        background: '#0f172a',
        borderBottom: '1px solid #1e293b',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>🛡️</span>
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>SDA-Pro SOC Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: '#10b981',
          }} />
          <span style={{ color: '#94a3b8', fontSize: '13px' }}>Live</span>
          {loading && <span style={{ color: '#64748b', fontSize: '12px' }}>Loading...</span>}
        </div>
      </div>

      {error && (
        <div style={{
          background: '#7f1d1d',
          color: '#fca5a5',
          padding: '8px 24px',
          fontSize: '13px',
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Metrics */}
      <MetricsBar metrics={metrics} />

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedIncident ? '1fr 1fr 1fr' : '1fr 1fr',
        gap: '16px',
        padding: '0 16px 16px',
      }}>
        <AlertStream alerts={alerts} />
        <IncidentQueue
          incidents={incidents}
          onSelect={handleIncidentSelect}
          selectedId={selectedIncident?.id}
        />
        {selectedIncident && (
          <ResponseConsole
            incident={selectedIncident}
            onUpdate={handleIncidentUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default AppController;