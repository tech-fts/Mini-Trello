import { io, Socket } from "socket.io-client";
import type { Board, Card } from "../types/index";

// Empty string = same origin (browser connects to Vite dev server,
// which proxies /socket.io to the backend via vite.config.ts).
// Set VITE_SOCKET_URL in production to the backend origin.
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "";

// ---- Event type definitions (backend → frontend) ----
export interface ServerToClientEvents {
  "board:created": (board: Board) => void;
  "board:updated": (board: Board) => void;
  "board:deleted": (data: { id: string }) => void;
  "card:updated": (card: Card) => void;
  "card:moved": (card: Card) => void;
  connect: () => void;
  disconnect: (reason: string) => void;
  connect_error: (error: Error) => void;
}

// ---- Event type definitions (frontend → backend) ----
export interface ClientToServerEvents {
  "board:create": (payload: { title: string; description?: string }) => void;
  "board:update": (payload: { id: string; title?: string; description?: string }) => void;
  "board:delete": (payload: { id: string }) => void;
  "card:move": (payload: { id: string; position: number; columnId?: string }) => void;
  "card:update": (payload: { id: string; title: string; description?: string }) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

/**
 * Returns the singleton socket instance, creating it on first call.
 * Does NOT connect — call socket.connect() or rely on auto-connect.
 */
export function getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      transports: ["websocket", "polling"],
    });
  }
  return socket;
}

/**
 * Connect the socket. Safe to call multiple times (no-op if already connected).
 */
export function connectSocket(authToken?: string): Socket<ServerToClientEvents, ClientToServerEvents> {
  const s = getSocket();
  if (authToken) {
    s.auth = { token: authToken };
  }
  if (!s.connected) {
    s.connect();
  }
  return s;
}

/**
 * Disconnect the socket.
 */
export function disconnectSocket(): void {
  if (socket?.connected) {
    socket.disconnect();
  }
}

/**
 * Check if the socket is currently connected.
 */
export function isSocketConnected(): boolean {
  return socket?.connected ?? false;
}
