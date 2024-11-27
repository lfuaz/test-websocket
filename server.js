// server.js
const WebSocket = require('ws');

// Use environment variables with defaults
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

const wss = new WebSocket.Server({ 
  host: HOST, 
  port: PORT,
  // Basic security headers
  clientTracking: true,
  handleProtocols: true
});

wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`Client connected from ${ip}`);
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

wss.on('error', (error) => {
  console.error('Server error:', error);
});

console.log(`WebSocket server is running on ws://${HOST}:${PORT}`);

