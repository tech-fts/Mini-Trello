"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validateRegisterInput = validateRegisterInput;
exports.validateLoginInput = validateLoginInput;
const http_1 = require("../../../shared/utils/http");
function validateEmail(email) {
    const normalized = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!normalized || !emailRegex.test(normalized)) {
        throw new http_1.DomainError("Valid email is required");
    }
}
function validatePassword(password) {
    if (!password || typeof password !== "string" || password.length < 6) {
        throw new http_1.DomainError("Password must be at least 6 characters");
    }
}
function validateRegisterInput(input) {
    if (!input || typeof input !== "object") {
        throw new http_1.DomainError("Invalid register input");
    }
    validateEmail(input.email);
    validatePassword(input.password);
}
function validateLoginInput(input) {
    if (!input || typeof input !== "object") {
        throw new http_1.DomainError("Invalid login input");
    }
    validateEmail(input.email);
    validatePassword(input.password);
}
