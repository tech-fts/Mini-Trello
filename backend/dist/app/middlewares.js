"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNotFound = handleNotFound;
exports.handleError = handleError;
function handleNotFound(req, res) {
    res.status(404).json({ error: "Not Found" });
}
function handleError(error, req, res, next) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
}
