import { WebSocketServer, WebSocket } from 'ws';
import express from 'express';
import http from 'http';

const app = express();
app.use(express.json());

const server = http.createServer(app);

// PATTERN: Observer — WebSocket server broadcasts to all dashboard clients
const wss = new WebSocketServer({ server });

const clients = new Set<WebSocket>();

wss.on('connection', (ws: WebSocket) => {
  clients.add(ws);
  console.log(`[WSServer] Client connected. Total: ${clients.size}`);

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`[WSServer] Client disconnected. Total: ${clients.size}`);
  });
});

// Broadcast to all connected dashboard clients
function broadcast(event: any): void {
  const msg = JSON.stringify(event);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
  console.log(`[WSServer] Broadcast ${event.eventType} to ${clients.size} clients`);
}

// REST endpoint — other services POST events here
app.post('/events', (req, res) => {
  const event = req.body;
  console.log(`[WSServer] Received event: ${event.eventType}`);
  broadcast(event);
  res.json({ broadcasted: true, clients: clients.size });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', connectedClients: clients.size });
});

const PORT = 3008;
server.listen(PORT, () => {
  console.log(`[WSServer] Running on port ${PORT}`);
});