// PATTERN: Observer — WebSocket client receives server-sent events
import { useDashboardStore } from '../store/dashboard.store';

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectDelay = 3000;

  connect(url: string = 'ws://localhost:3008'): void {
    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('[WebSocket] Connected to event stream');
      };

      // PATTERN: Observer — handle incoming events
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const store = useDashboardStore.getState();

        switch (data.eventType) {
          case 'AlertIngested':
            store.addLiveAlert(data.payload);
            break;
          case 'IncidentCreated':
          case 'IncidentStateChanged':
            store.loadIncidents(); // reload
            break;
          case 'ResponseActionExecuted':
            store.loadIncidents();
            break;
        }
      };

      this.ws.onclose = () => {
        console.log('[WebSocket] Disconnected — reconnecting...');
        setTimeout(() => this.connect(url), this.reconnectDelay);
      };

      this.ws.onerror = (err) => {
        console.error('[WebSocket] Error:', err);
      };
    } catch (err) {
      console.error('[WebSocket] Failed to connect');
    }
  }

  disconnect(): void {
    this.ws?.close();
  }
}

export const wsService = new WebSocketService();