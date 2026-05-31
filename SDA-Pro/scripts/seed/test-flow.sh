#!/bin/bash
BASE="http://localhost"

echo "=== Step 1: Ingest Alert ==="
ALERT=$(curl -s -X POST $BASE:3001/api/ingest/splunk \
  -H "Content-Type: application/json" \
  -d '{"severity":"critical","src_ip":"185.220.101.45","dest":"10.0.1.50","search_name":"APT29 Detected"}')
echo $ALERT
ALERT_ID=$(echo $ALERT | grep -o '"alertId":"[^"]*"' | cut -d'"' -f4)

echo ""
echo "=== Step 2: Create Incident ==="
INCIDENT=$(curl -s -X POST $BASE:3003/api/incidents \
  -H "Content-Type: application/json" \
  -d "{\"alertIds\":[\"$ALERT_ID\"],\"severity\":\"CRITICAL\"}")
echo $INCIDENT
INCIDENT_ID=$(echo $INCIDENT | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

echo ""
echo "=== Step 3: Begin Triage ==="
curl -s -X POST $BASE:3003/api/incidents/$INCIDENT_ID/triage \
  -H "Content-Type: application/json" \
  -d '{"analystId":"analyst-001"}'

echo ""
echo "=== Step 4: Check Threat Intel ==="
curl -s -X POST $BASE:3005/api/threat-intel/reputation \
  -H "Content-Type: application/json" \
  -d '{"indicator":"185.220.101.45","type":"IP_ADDRESS"}'

echo ""
echo "=== Step 5: Execute Response ==="
curl -s -X POST $BASE:3004/api/response/$INCIDENT_ID/execute \
  -H "Content-Type: application/json" \
  -d '{"severity":"CRITICAL","assetCriticality":"HIGH","targetIP":"185.220.101.45"}'

echo ""
echo "=== Step 6: Check Audit Logs ==="
curl -s $BASE:3006/api/audit/logs

echo ""
echo "=== FLOW COMPLETE ==="