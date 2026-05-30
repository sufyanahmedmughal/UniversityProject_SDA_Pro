export class AppLogger {
    private serviceName: string;

    constructor(serviceName: string) {
        this.serviceName = serviceName;
    }

    log(message: string, data?: any) {
        console.log(JSON.stringify({
            level: 'INFO',
            service: this.serviceName,
            message,
            data,
            timestamp: new Date().toISOString(),
        }));
    }

    error(message: string, error?: any) {
        console.error(JSON.stringify({
            level: 'ERROR',
            service: this.serviceName,
            message,
            error: error?.message || error,
            timestamp: new Date().toISOString(),
        }));
    }
}