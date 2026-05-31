// MVC: View — Incident queue
import React from 'react';
import { Incident } from '../models/types';

interface Props {
  incidents: Incident[];
  onSelect: (incident: Incident) => void;
  selectedId?: string;
}

const stateColor: Record<string, string> = {
  NEW: '#64748b',
  UNDER_TRIAGE: '#3b82f6',
  CONTAINMENT: '#f59e0b',
  ERADICATION: '#ef4444',
  RECOVERY: '#8b5cf6',
  POST_INCIDENT_REVIEW: '#06b6d4',
  CLOSED: '#10b981',
};

const IncidentQueue: React.FC<Props> = ({ incidents, onSelect, selectedId }) => {
  return (
    <div style={{ background: '#0f172a', borderRadius: '8px', padding: '16px' }}>
      <h3 style={{ color: '#f1f5f9', marginBottom: '12px' }}>
        📋 Incident Queue ({incidents.length})
      </h3>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {incidents.length === 0 && (
          <div style={{ color: '#64748b' }}>No incidents...</div>
        )}
        {incidents.map(incident => (
          <div
            key={incident.id}
            onClick={() => onSelect(incident)}
            style={{
              background: selectedId === incident.id ? '#1e3a5f' : '#1e293b',
              border: selectedId === incident.id ? '1px solid #3b82f6' : '1px solid transparent',
              padding: '12px',
              marginBottom: '8px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: 'bold' }}>
                #{incident.id.slice(0, 8)}
              </span>
              <span style={{
                background: stateColor[incident.state] || '#64748b',
                color: '#fff',
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: '12px',
              }}>
                {incident.state}
              </span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
              Severity: {incident.severity} |
              Alerts: {incident.affectedAlertIds?.length || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentQueue;