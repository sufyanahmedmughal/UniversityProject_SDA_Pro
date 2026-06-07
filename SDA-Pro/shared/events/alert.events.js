"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType["ALERT_INGESTED"] = "AlertIngested";
    EventType["ALERT_ENRICHED"] = "AlertEnriched";
    EventType["INCIDENT_CREATED"] = "IncidentCreated";
    EventType["INCIDENT_STATE_CHANGED"] = "IncidentStateChanged";
    EventType["RESPONSE_ACTION_EXECUTED"] = "ResponseActionExecuted";
    EventType["THREAT_INTEL_UPDATED"] = "ThreatIntelUpdated";
})(EventType || (exports.EventType = EventType = {}));
//# sourceMappingURL=alert.events.js.map