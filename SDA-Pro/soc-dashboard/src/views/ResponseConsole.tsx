// MVC: View — Response action console
import React, { useState } from 'react';
import { Incident } from '../models/types';
import { IncidentAPI, ResponseAPI } from '../models/api.client';

interface Props {
  incident: Incident;
  onUpdate: () => void;
}

const ResponseConsole: React.FC<Props> = ({ incident, onUpdate }) => {
  const [targetIP, setTargetIP] = useState('');
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog(prev => [...prev, msg]);

  const handleTriage = async () => {
    setLoading(true);
    try {
      await IncidentAPI.beginTriage(incident.id, 'analyst-001');
      addLog(`✅ Triage started`);
      onUpdate();
    } catch (e: any) {
      addLog(`❌ ${e.message}`);
    }
    setLoading(false);
  };

  const handleContainment = async () => {
    setLoading(true);
    try {
      await IncidentAPI.initiateContainment(incident.id, ['BLOCK_IP', 'ISOLATE_ENDPOINT']);
      addLog(`✅ Containment initiated`);
      onUpdate();
    } catch (e: any) {
      addLog(`❌ ${e.message}`);
    }
    setLoading(false);
  };

  const handleExecuteResponse = async () => {
    if (!targetIP) { addLog('❌ Enter target IP first'); return; }
    setLoading(true);
    try {
      const result = await ResponseAPI.execute(
        incident.id, incident.severity, 'HIGH', targetIP,
      );
      result.outcomes.forEach(o => {
        addLog(`${o.success ? '✅' : '❌'} ${o.actionType}: ${o.details}`);
      });
      onUpdate();
    } catch (e: any) {
      addLog(`❌ ${e.message}`);
    }
    setLoading(false);
  };

  const handleEradication = async () => {
    setLoading(true);
    try {
      await IncidentAPI.beginEradication(incident.id);
      addLog('✅ Eradication started');
      onUpdate();
    } catch (e: any) {
      addLog(`❌ ${e.message}`);
    }
    setLoading(false);
  };

  const handleClose = async () => {
    setLoading(true);
    try {
      await IncidentAPI.close(incident.id);
      addLog('✅ Incident closed');
      onUpdate();
    } catch (e: any) {
      addLog(`❌ ${e.message}`);
    }
    setLoading(false);
  };

  const btnStyle = {
    padding: '8px 14px',
    borderRadius: '6px',
    border: 'none',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontSize: '12px',
    fontWeight: 'bold' as const,
  };

  return (
    <div style={{ background: '#0f172a', borderRadius: '8px', padding: '16px' }}>
      <h3 style={{ color: '#f1f5f9', marginBottom: '4px' }}>
        🎮 Response Console
      </h3>
      <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '12px' }}>
        Incident: #{incident.id.slice(0, 8)} | State: {incident.state}
      </div>

      {/* Target IP Input */}
      <input
        value={targetIP}
        onChange={e => setTargetIP(e.target.value)}
        placeholder="Target IP (e.g. 185.220.101.45)"
        style={{
          width: '100%',
          padding: '8px',
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '6px',
          color: '#f1f5f9',
          marginBottom: '12px',
          boxSizing: 'border-box',
        }}
      />

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <button onClick={handleTriage}
          style={{ ...btnStyle, background: '#3b82f6', color: '#fff' }}>
          Begin Triage
        </button>
        <button onClick={handleContainment}
          style={{ ...btnStyle, background: '#f59e0b', color: '#000' }}>
          Containment
        </button>
        <button onClick={handleExecuteResponse}
          style={{ ...btnStyle, background: '#ef4444', color: '#fff' }}>
          Execute Response
        </button>
        <button onClick={handleEradication}
          style={{ ...btnStyle, background: '#8b5cf6', color: '#fff' }}>
          Eradication
        </button>
        <button onClick={handleClose}
          style={{ ...btnStyle, background: '#10b981', color: '#fff' }}>
          Close Incident
        </button>
      </div>

      {/* Action Log */}
      <div style={{
        background: '#020617',
        borderRadius: '6px',
        padding: '10px',
        maxHeight: '150px',
        overflowY: 'auto',
        fontFamily: 'monospace',
        fontSize: '12px',
      }}>
        {log.length === 0 && (
          <span style={{ color: '#475569' }}>Action log will appear here...</span>
        )}
        {log.map((entry, i) => (
          <div key={i} style={{ color: '#94a3b8', marginBottom: '2px' }}>
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseConsole;