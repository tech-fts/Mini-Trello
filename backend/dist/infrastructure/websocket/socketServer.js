"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSocketServer = createSocketServer;
exports.getSocketServer = getSocketServer;
exports.emitBoardCreated = emitBoardCreated;
exports.emitBoardUpdated = emitBoardUpdated;
exports.emitBoardDeleted = emitBoardDeleted;
exports.emitCardUpdated = emitCardUpdated;
exports.emitCardMoved = emitCardMoved;
const socket_io_1 = require("socket.io");
let io = null;
/**
 * Attach Socket.IO to an existing HTTP server.
 * Idempotent — safe to call multiple times.
 */
function createSocketServer(httpServer) {
    if (io)
        return io;
    io = new socket_io_1.Server(httpServer, {
        cors: { origin: true, credentials: true },
        // Only use WebSocket transport in production for lower overhead.
        // In dev, keep polling fallback for compatibility with Vite's HMR proxy.
        transports: ["websocket", "polling"],
    });
    io.on("connection", (socket) => {
        console.log(`[Socket.IO] Client connected: ${socket.id}`);
        socket.on("disconnect", (reason) => {
            console.log(`[Socket.IO] Client disconnected (${reason}): ${socket.id}`);
        });
    });
    return io;
}
/**
 * Return the singleton Socket.IO server instance.
 * Returns null if createSocketServer() hasn't been called yet.
 */
function getSocketServer() {
    return io;
}
// ---- Typed emit helpers (call from controllers) ----
function emitBoardCreated(board) {
    io?.emit("board:created", board);
}
function emitBoardUpdated(board) {
    io?.emit("board:updated", board);
}
function emitBoardDeleted(id) {
    io?.emit("board:deleted", { id });
}
function emitCardUpdated(card) {
    io?.emit("card:updated", card);
}
function emitCardMoved(card) {
    io?.emit("card:moved", card);
}
