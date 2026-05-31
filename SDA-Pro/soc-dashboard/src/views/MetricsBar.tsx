// MVC: View — Metrics summary bar
import React from 'react';
import { DashboardMetrics } from '../models/types';

interface Props {
  metrics: DashboardMetrics;
}

const MetricsBar: React.FC<Props> = ({ metrics }) => {
  const cards = [
    { label: 'Total Alerts', value: metrics.totalAlerts, color: '#3b82f6' },
    { label: 'Total Incidents', value: metrics.totalIncidents, color: '#8b5cf6' },
    { label: 'Open Incidents', value: metrics.openIncidents, color: '#f59e0b' },
    { label: 'Critical', value: metrics.criticalIncidents, color: '#ef4444' },
    { label: 'Resolved Today', value: metrics.resolvedToday, color: '#10b981' },
  ];

  return (
    <div style={{ display: 'flex', gap: '16px', padding: '16px', flexWrap: 'wrap' }}>
      {cards.map(card => (
        <div key={card.label} style={{
          background: '#1e293b',
          borderLeft: `4px solid ${card.color}`,
          borderRadius: '8px',
          padding: '16px 24px',
          minWidth: '150px',
          flex: 1,
        }}>
          <div style={{ color: '#94a3b8', fontSize: '12px' }}>{card.label}</div>
          <div style={{ color: '#f1f5f9', fontSize: '28px', fontWeight: 'bold' }}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsBar;