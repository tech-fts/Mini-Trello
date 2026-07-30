"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
exports.sanitizeId = sanitizeId;
exports.sendError = sendError;
/**
 * Sanitize a route parameter ID — strip non-alphanumeric chars,
 * limit to 100 chars max.
 */
function sanitizeId(id) {
    return id.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 100);
}
/**
 * Send a structured error response.
 *
 * SOLID: SRP — this function only knows how to build error responses.
 * Security: Domain errors (validation, not-found) go to the client.
 *           Infrastructure errors (DB connection, Prisma) are masked
 *           and only logged server-side.
 */
function sendError(res, error) {
    if (error instanceof DomainError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
    }
    // Infrastructure / unexpected — log the real error, return a safe message.
    console.error("[infra-error]", error);
    res.status(500).json({ error: "Internal server error" });
}
/**
 * Tagged error class for domain-level failures that are safe to
 * expose to API consumers (validation, not-found, conflict, etc.).
 */
class DomainError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = "DomainError";
        this.statusCode = statusCode;
    }
}
exports.DomainError = DomainError;
