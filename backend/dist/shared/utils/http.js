"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeId = sanitizeId;
exports.sendError = sendError;
function sanitizeId(id) {
    return id.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 100);
}
function sendError(res, error) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
    }
    res.status(500).json({ error: "Unexpected error" });
}
