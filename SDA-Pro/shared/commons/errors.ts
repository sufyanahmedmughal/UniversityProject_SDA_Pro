export class AlertNotFoundException extends Error {
    constructor(id: string) {
        super(`Alert not found: ${id}`);
    }
}

export class IncidentNotFoundException extends Error {
    constructor(id: string) {
        super(`Incident not found: ${id}`);
    }
}

export class InvalidStateTransitionError extends Error {
    constructor(from: string, to: string) {
        super(`Invalid transition: ${from} -> ${to}`);
    }
}

export class UnauthorizedActionError extends Error {
    constructor(action: string) {
        super(`Unauthorized action: ${action}`);
    }
}