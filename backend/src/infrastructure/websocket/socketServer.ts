import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import type { Board } from "../../domain/boards/entities/board";
import type { Card } from "../../domain/cards/entities/card";

/**
 * Socket.IO server wrapper.
 *
 * SOLID — Single Responsibility: owns the Socket.IO Server lifecycle and
 * provides typed emit helpers.  Does NOT know about Express or HTTP routing.
 *
 * DIP — depends on abstractions (the http.Server abstraction).
 */

// ---- Event payload types (server → client) ----
export interface ServerToClientEvents {
  "board:created": (board: Board) => void;
  "board:updated": (board: Board) => void;
  "board:deleted": (data: { id: string }) => void;
  "card:updated": (card: Card) => void;
  "card:moved": (card: Card) => void;
}

// ---- Event payload types (client → server) ----
export interface ClientToServerEvents {
  "board:create": (payload: { title: string; description?: string }) => void;
  "board:update": (payload: { id: string; title?: string; description?: string }) => void;
  "board:delete": (payload: { id: string }) => void;
  "card:move": (payload: { id: string; position: number; columnId?: string }) => void;
  "card:update": (payload: { id: string; title: string; description?: string }) => void;
}

export type TypedSocketServer = Server<ClientToServerEvents, ServerToClientEvents>;
export type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

let io: TypedSocketServer | null = null;

/**
 * Attach Socket.IO to an existing HTTP server.
 * Idempotent — safe to call multiple times.
 */
export function createSocketServer(httpServer: HttpServer): TypedSocketServer {
  if (io) return io;

  io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: { origin: true, credentials: true },
    // Only use WebSocket transport in production for lower overhead.
    // In dev, keep polling fallback for compatibility with Vite's HMR proxy.
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket: TypedSocket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    socket.on("disconnect", (reason: string) => {
      console.log(`[Socket.IO] Client disconnected (${reason}): ${socket.id}`);
    });
  });

  return io;
}

/**
 * Return the singleton Socket.IO server instance.
 * Returns null if createSocketServer() hasn't been called yet.
 */
export function getSocketServer(): TypedSocketServer | null {
  return io;
}

// ---- Typed emit helpers (call from controllers) ----

export function emitBoardCreated(board: Board): void {
  io?.emit("board:created", board);
}

export function emitBoardUpdated(board: Board): void {
  io?.emit("board:updated", board);
}

export function emitBoardDeleted(id: string): void {
  io?.emit("board:deleted", { id });
}

export function emitCardUpdated(card: Card): void {
  io?.emit("card:updated", card);
}

export function emitCardMoved(card: Card): void {
  io?.emit("card:moved", card);
}
