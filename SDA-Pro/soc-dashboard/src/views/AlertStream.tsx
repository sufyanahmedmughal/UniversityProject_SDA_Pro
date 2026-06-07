// MVC: View — Live alert stream
import React from 'react';
import { Alert, Severity } from '../models/types';

interface Props {
  alerts: Alert[];
}

const severityColor: Record<Severity, string> = {
  [Severity.CRITICAL]: '#ef4444',
  [Severity.HIGH]: '#f97316',
  [Severity.MEDIUM]: '#f59e0b',
  [Severity.LOW]: '#22c55e',
};

const AlertStream: React.FC<Props> = ({ alerts }) => {
  return (
    <div style={{ background: '#0f172a', borderRadius: '8px', padding: '16px' }}>
      <h3 style={{ color: '#f1f5f9', marginBottom: '12px' }}>
        🔴 Live Alert Stream
      </h3>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {alerts.length === 0 && (
          <div style={{ color: '#64748b' }}>No alerts yet...</div>
        )}
        {alerts.map(alert => (
          <div key={alert.id} style={{
            borderLeft: `3px solid ${severityColor[alert.severity] || '#64748b'}`,
            background: '#1e293b',
            padding: '10px 14px',
            marginBottom: '8px',
            borderRadius: '4px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{
                color: severityColor[alert.severity],
                fontSize: '11px',
                fontWeight: 'bold',
              }}>
                {alert.severity}
              </span>
              <span style={{ color: '#64748b', fontSize: '11px' }}>
                {new Date(alert.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <div style={{ color: '#e2e8f0', fontSize: '13px', marginTop: '4px' }}>
              {alert.description}
            </div>
            <div style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>
              {alert.sourceIP} → {alert.destinationIP}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertStream;