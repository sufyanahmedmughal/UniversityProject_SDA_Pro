-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id VARCHAR PRIMARY KEY,
  "sourceType" VARCHAR NOT NULL,
  severity VARCHAR NOT NULL,
  "sourceIP" VARCHAR,
  "destinationIP" VARCHAR,
  description TEXT,
  "rawPayload" JSONB,
  "enrichmentData" JSONB,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Incidents table
CREATE TABLE IF NOT EXISTS incidents (
  id VARCHAR PRIMARY KEY,
  state VARCHAR NOT NULL,
  severity VARCHAR NOT NULL,
  "affectedAlertIds" JSONB,
  "assignedAnalystId" VARCHAR,
  "plannedActions" JSONB,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR PRIMARY KEY,
  "eventType" VARCHAR NOT NULL,
  "eventId" VARCHAR NOT NULL,
  payload JSONB,
  immutable BOOLEAN DEFAULT TRUE,
  "createdAt" TIMESTAMP DEFAULT NOW()
);