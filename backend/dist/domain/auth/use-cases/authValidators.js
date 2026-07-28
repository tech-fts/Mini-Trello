"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validateRegisterInput = validateRegisterInput;
exports.validateLoginInput = validateLoginInput;
function validateEmail(email) {
    const normalized = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!normalized || !emailRegex.test(normalized)) {
        throw new Error("Valid email is required");
    }
}
function validatePassword(password) {
    if (!password || typeof password !== "string" || password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }
}
function validateRegisterInput(input) {
    if (!input || typeof input !== "object") {
        throw new Error("Invalid register input");
    }
    validateEmail(input.email);
    validatePassword(input.password);
}
function validateLoginInput(input) {
    if (!input || typeof input !== "object") {
        throw new Error("Invalid login input");
    }
    validateEmail(input.email);
    validatePassword(input.password);
}
