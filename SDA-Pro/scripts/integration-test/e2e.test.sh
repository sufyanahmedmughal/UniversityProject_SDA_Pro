#!/bin/bash

BASE_INGEST="http://localhost:3001/api"
BASE_INCIDENT="http://localhost:3003/api"
BASE_RESPONSE="http://localhost:3004/api"
BASE_INTEL="http://localhost:3005/api"
BASE_AUDIT="http://localhost:3006/api"
BASE_ENRICH="http://localhost:3002/api"

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

pass() { echo -e "${GREEN}✅ PASS: $1${NC}"; }
fail() { echo -e "${RED}❌ FAIL: $1${NC}"; }

echo "================================================"
echo "   SDA-Pro End-to-End Integration Test"
echo "================================================"

# Step 1: Ingest Alert
echo ""
echo "--- Step 1: Alert Ingestion (Factory Method + Composite + Singleton) ---"
INGEST=$(curl -s -X POST $BASE_INGEST/ingest/splunk \
  -H "Content-Type: application/json" \
  -d '{
    "severity": "critical",
    "src_ip": "185.220.101.45",
    "dest": "10.0.1.50",
    "search_name": "APT29 Lateral Movement"
  }')
echo "Response: $INGEST"
ALERT_ID=$(echo $INGEST | python3 -c "import sys,json; print(json.load(sys.stdin)['alertId'])" 2>/dev/null)
[ -n "$ALERT_ID" ] && pass "Alert ingested: $ALERT_ID" || fail "Alert ingestion"

# Step 2: Enrich Alert
echo ""
echo "--- Step 2: Alert Enrichment (Chain of Responsibility) ---"
ENRICH=$(curl -s -X POST $BASE_ENRICH/enrichment/enrich \
  -H "Content-Type: application/json" \
  -d "{\"alertId\":\"$ALERT_ID\",\"severity\":\"CRITICAL\"}")
echo "Response: $ENRICH"
[ -n "$ENRICH" ] && pass "Alert enriched" || fail "Enrichment"

# Step 3: Threat Intel Check
echo ""
echo "--- Step 3: Threat Intel (Adapter + Proxy + Cache) ---"
INTEL=$(curl -s -X POST $BASE_INTEL/threat-intel/reputation \
  -H "Content-Type: application/json" \
  -d '{"indicator":"185.220.101.45","type":"IP_ADDRESS"}')
echo "Response: $INTEL"
[ -n "$INTEL" ] && pass "Threat intel checked" || fail "Threat intel"

# Step 4: Create Incident
echo ""
echo "--- Step 4: Create Incident (State Pattern - NEW) ---"
INCIDENT=$(curl -s -X POST $BASE_INCIDENT/incidents \
  -H "Content-Type: application/json" \
  -d "{\"alertIds\":[\"$ALERT_ID\"],\"severity\":\"CRITICAL\"}")
echo "Response: $INCIDENT"
INCIDENT_ID=$(echo $INCIDENT | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])" 2>/dev/null)
[ -n "$INCIDENT_ID" ] && pass "Incident created: $INCIDENT_ID" || fail "Incident creation"

# Step 5: Begin Triage
echo ""
echo "--- Step 5: State Transition NEW → UNDER_TRIAGE ---"
TRIAGE=$(curl -s -X POST $BASE_INCIDENT/incidents/$INCIDENT_ID/triage \
  -H "Content-Type: application/json" \
  -d '{"analystId":"analyst-sufyan-001"}')
echo "Response: $TRIAGE"
STATE=$(echo $TRIAGE | python3 -c "import sys,json; print(json.load(sys.stdin)['state'])" 2>/dev/null)
[ "$STATE" = "UNDER_TRIAGE" ] && pass "State = UNDER_TRIAGE" || fail "Triage transition"

# Step 6: Containment
echo ""
echo "--- Step 6: State Transition → CONTAINMENT ---"
CONTAIN=$(curl -s -X POST $BASE_INCIDENT/incidents/$INCIDENT_ID/containment \
  -H "Content-Type: application/json" \
  -d '{"actions":["BLOCK_IP","ISOLATE_ENDPOINT"]}')
echo "Response: $CONTAIN"
STATE=$(echo $CONTAIN | python3 -c "import sys,json; print(json.load(sys.stdin)['state'])" 2>/dev/null)
[ "$STATE" = "CONTAINMENT" ] && pass "State = CONTAINMENT" || fail "Containment transition"

# Step 7: Execute Response
echo ""
echo "--- Step 7: Response Orchestration (Facade + Strategy + Decorator) ---"
RESPONSE=$(curl -s -X POST $BASE_RESPONSE/response/$INCIDENT_ID/execute \
  -H "Content-Type: application/json" \
  -d '{
    "severity": "CRITICAL",
    "assetCriticality": "HIGH",
    "targetIP": "185.220.101.45"
  }')
echo "Response: $RESPONSE"
[ -n "$RESPONSE" ] && pass "Response executed" || fail "Response execution"

# Step 8: Eradication
echo ""
echo "--- Step 8: State Transition → ERADICATION ---"
ERAD=$(curl -s -X POST $BASE_INCIDENT/incidents/$INCIDENT_ID/eradication)
STATE=$(echo $ERAD | python3 -c "import sys,json; print(json.load(sys.stdin)['state'])" 2>/dev/null)
[ "$STATE" = "ERADICATION" ] && pass "State = ERADICATION" || fail "Eradication transition"

# Step 9: Recovery
echo ""
echo "--- Step 9: State Transition → RECOVERY ---"
RECOV=$(curl -s -X POST $BASE_INCIDENT/incidents/$INCIDENT_ID/recovery)
STATE=$(echo $RECOV | python3 -c "import sys,json; print(json.load(sys.stdin)['state'])" 2>/dev/null)
[ "$STATE" = "RECOVERY" ] && pass "State = RECOVERY" || fail "Recovery transition"

# Step 10: Close
echo ""
echo "--- Step 10: State Transition → CLOSED ---"
CLOSE=$(curl -s -X POST $BASE_INCIDENT/incidents/$INCIDENT_ID/close)
STATE=$(echo $CLOSE | python3 -c "import sys,json; print(json.load(sys.stdin)['state'])" 2>/dev/null)
[ "$STATE" = "CLOSED" ] && pass "State = CLOSED" || fail "Close transition"

# Step 11: Audit Logs
echo ""
echo "--- Step 11: Audit Trail (Observer + Immutable Logs) ---"
AUDIT=$(curl -s $BASE_AUDIT/audit/logs)
[ -n "$AUDIT" ] && pass "Audit logs retrieved" || fail "Audit logs"

echo ""
echo "================================================"
echo "   End-to-End Test Complete"
echo "================================================"