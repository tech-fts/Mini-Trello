"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCardPositionInput = validateCardPositionInput;
function validateCardPositionInput(input) {
    if (input.position === undefined || input.position === null) {
        throw new Error("Position is required");
    }
    if (!Number.isFinite(input.position) || input.position < 0) {
        throw new Error("Position must be a non-negative number");
    }
}
