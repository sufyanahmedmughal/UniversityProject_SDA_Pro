// PATTERN: Observer consumer — writes immutable audit logs
export interface AuditEntry {
  id: string;
  eventType: string;
  eventId: string;
  payload: string;
  createdAt: string;
  immutable: boolean;
}

export class AuditService {
  // In-memory store (PostgreSQL in Step 7)
  private logs: AuditEntry[] = [];

  async log(eventType: string, eventId: string, payload: any): Promise<void> {
    const entry: AuditEntry = {
      id: Math.random().toString(36).substr(2, 9),
      eventType,
      eventId,
      payload: JSON.stringify(payload),
      createdAt: new Date().toISOString(),
      immutable: true,
    };
    this.logs.push(entry);
    console.log(`[AuditService] Logged: ${eventType} — ${eventId}`);
  }

  async getAll(): Promise<AuditEntry[]> {
    return this.logs;
  }

  async getByEventType(eventType: string): Promise<AuditEntry[]> {
    return this.logs.filter(l => l.eventType === eventType);
  }
}