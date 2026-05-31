"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = createEvent;
function createEvent(type, payload) {
    return {
        eventId: Math.random().toString(36).substr(2, 9),
        eventType: type,
        timestamp: new Date().toISOString(),
        payload,
    };
}
//# sourceMappingURL=domain-events.js.map