// PATTERN: Chain of Responsibility — Abstract Handler
import { AlertComponent } from '../../domain/composite/alert-component.interface';
export interface EnrichmentResult {
    handled: boolean;
    handlerName: string;
    data: any;
}

export abstract class EnrichmentHandler {
    private nextHandler: EnrichmentHandler | null = null;

    setNext(handler: EnrichmentHandler): EnrichmentHandler {
        this.nextHandler = handler;
        return handler; // allows chaining
    }

    async handle(alert: AlertComponent): Promise<EnrichmentResult[]> {
        const result = await this.doEnrich(alert);
        const results: EnrichmentResult[] = [result];

        if (this.nextHandler) {
            const nextResults = await this.nextHandler.handle(alert);
            results.push(...nextResults);
        }

        return results;
    }

    protected abstract doEnrich(alert: AlertComponent): Promise<EnrichmentResult>;
}