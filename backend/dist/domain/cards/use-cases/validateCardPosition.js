"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCardPositionInput = validateCardPositionInput;
const http_1 = require("../../../shared/utils/http");
function validateCardPositionInput(input) {
    if (input.position === undefined || input.position === null) {
        throw new http_1.DomainError("Position is required");
    }
    if (!Number.isFinite(input.position) || input.position < 0) {
        throw new http_1.DomainError("Position must be a non-negative number");
    }
}
