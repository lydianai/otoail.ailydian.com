// ============================================
// TÜRK OTO AI - OBD-II WebSocket Stream
// Real-time vehicle data streaming
// ============================================

import { NextRequest, NextResponse } from 'next/server';

// ==================== Types ====================
interface OBDStreamData {
  timestamp: string;
  rpm: number;
  speed: number;
  engineLoad: number;
  throttlePosition: number;
  coolantTemp: number;
  fuelLevel: number;
  batteryVoltage: number;
  efficiency: number;
  dtcCodes: string[];
}

interface StreamClient {
  id: string;
  controller: ReadableStreamDefaultController;
  lastUpdate: Date;
  timeout: NodeJS.Timeout;
}

// ==================== In-Memory Storage ====================
const activeClients = new Map<string, StreamClient>();
let streamInterval: NodeJS.Timeout | null = null;

// Client timeout - disconnect after 30 seconds of inactivity
const CLIENT_TIMEOUT_MS = 30000;

// Maximum stream duration - force disconnect after 5 minutes
const MAX_STREAM_DURATION_MS = 300000;

// ==================== Mock Data Generator (for demo/testing) ====================
// NOTE: This will be replaced with real OBD data when device is connected
function generateMockOBDData(): OBDStreamData {
  const baseRPM = 2000 + Math.random() * 1000;
  const baseSpeed = 60 + Math.random() * 40;

  return {
    timestamp: new Date().toISOString(),
    rpm: Math.round(baseRPM + (Math.random() - 0.5) * 200),
    speed: Math.round(baseSpeed + (Math.random() - 0.5) * 10),
    engineLoad: Math.round(40 + Math.random() * 30),
    throttlePosition: Math.round(30 + Math.random() * 40),
    coolantTemp: Math.round(85 + Math.random() * 10),
    fuelLevel: Math.round(40 + Math.random() * 20),
    batteryVoltage: parseFloat((13.8 + Math.random() * 0.8).toFixed(1)),
    efficiency: Math.round(70 + Math.random() * 20),
    dtcCodes: [],
  };
}

// ==================== Stream Management ====================

/**
 * Start streaming data to all connected clients
 */
function startStreaming(): void {
  if (streamInterval) return;

  console.log('[OBD Stream] Starting stream...');

  // Send data every 1000ms (1Hz) - reduced frequency to prevent overwhelming clients
  // This is sufficient for dashboard display and prevents refresh loops
  streamInterval = setInterval(() => {
    const data = generateMockOBDData();
    broadcastToClients(data);
  }, 1000);
}

/**
 * Stop streaming when no clients connected
 */
function stopStreaming(): void {
  if (streamInterval) {
    clearInterval(streamInterval);
    streamInterval = null;
    console.log('[OBD Stream] Streaming stopped');
  }
}

/**
 * Broadcast data to all connected clients
 */
function broadcastToClients(data: OBDStreamData): void {
  const message = `data: ${JSON.stringify(data)}\n\n`;

  activeClients.forEach((client, clientId) => {
    try {
      client.controller.enqueue(new TextEncoder().encode(message));
      client.lastUpdate = new Date();
    } catch (error) {
      console.log(`[OBD Stream] Client ${clientId} disconnected`);
      activeClients.delete(clientId);
    }
  });

  // Stop streaming if no clients
  if (activeClients.size === 0) {
    stopStreaming();
  }
}

/**
 * Add new client to stream with automatic timeout
 */
function addClient(clientId: string, controller: ReadableStreamDefaultController): void {
  // Create timeout for this client
  const timeout = setTimeout(() => {
    console.log(`[OBD Stream] Client ${clientId} timed out after ${CLIENT_TIMEOUT_MS}ms`);
    removeClient(clientId);
    try {
      controller.close();
    } catch (error) {
      // Already closed
    }
  }, CLIENT_TIMEOUT_MS);

  activeClients.set(clientId, {
    id: clientId,
    controller,
    lastUpdate: new Date(),
    timeout,
  });

  console.log(`[OBD Stream] Client ${clientId} connected (total: ${activeClients.size})`);

  // Start streaming if first client
  if (activeClients.size === 1) {
    startStreaming();
  }

  // Auto-disconnect after max duration
  setTimeout(() => {
    if (activeClients.has(clientId)) {
      console.log(`[OBD Stream] Force disconnect ${clientId} after ${MAX_STREAM_DURATION_MS}ms`);
      removeClient(clientId);
      try {
        controller.close();
      } catch (error) {
        // Already closed
      }
    }
  }, MAX_STREAM_DURATION_MS);
}

/**
 * Remove client from stream and clear timeout
 */
function removeClient(clientId: string): void {
  const client = activeClients.get(clientId);

  if (client) {
    // Clear timeout to prevent memory leak
    clearTimeout(client.timeout);
    activeClients.delete(clientId);
    console.log(`[OBD Stream] Client ${clientId} disconnected (remaining: ${activeClients.size})`);

    // Stop streaming if no clients
    if (activeClients.size === 0) {
      stopStreaming();
    }
  }
}

// ==================== API Handler ====================

/**
 * GET /api/obd/stream
 * Server-Sent Events (SSE) endpoint for real-time OBD data
 */
export async function GET(request: NextRequest) {
  // Generate unique client ID
  const clientId = `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Create readable stream
  const stream = new ReadableStream({
    start(controller) {
      // Add client to active connections
      addClient(clientId, controller);

      // Send initial connection message
      const connectMessage = `data: ${JSON.stringify({
        type: 'connected',
        clientId,
        message: 'OBD stream connected',
        timestamp: new Date().toISOString()
      })}\n\n`;
      controller.enqueue(new TextEncoder().encode(connectMessage));

      // Cleanup on stream close
      request.signal.addEventListener('abort', () => {
        removeClient(clientId);
        controller.close();
      });
    },

    cancel() {
      removeClient(clientId);
    },
  });

  // Return SSE response with proper headers
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'X-Accel-Buffering': 'no', // Disable nginx buffering
    },
  });
}

/**
 * POST /api/obd/stream
 * Control endpoint for OBD stream (start/stop/config)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, config } = body;

    switch (action) {
      case 'status':
        return NextResponse.json({
          success: true,
          streaming: streamInterval !== null,
          connectedClients: activeClients.size,
          clients: Array.from(activeClients.keys()),
        });

      case 'stop':
        stopStreaming();
        return NextResponse.json({
          success: true,
          message: 'Streaming stopped',
        });

      case 'start':
        startStreaming();
        return NextResponse.json({
          success: true,
          message: 'Streaming started',
        });

      case 'config':
        // Update streaming configuration (e.g., sampling rate)
        return NextResponse.json({
          success: true,
          message: 'Configuration updated',
          config,
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('[OBD Stream] POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
