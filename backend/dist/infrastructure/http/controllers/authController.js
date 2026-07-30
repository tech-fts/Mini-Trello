"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthController = createAuthController;
const registerUser_1 = require("../../../domain/auth/use-cases/registerUser");
const loginUser_1 = require("../../../domain/auth/use-cases/loginUser");
const http_1 = require("../../../shared/utils/http");
/**
 * Formats a domain User into the AuthResponse shape the frontend expects.
 * DRY: single place — both registerHandler and loginHandler use this.
 */
function formatAuthResponse(user) {
    return { user: { id: user.id, email: user.email } };
}
function createAuthController(userRepository) {
    return {
        registerHandler: async (req, res) => {
            try {
                const input = parseAuthInput(req.body);
                const user = await (0, registerUser_1.registerUser)(userRepository, input);
                res.status(201).json(formatAuthResponse(user));
            }
            catch (error) {
                (0, http_1.sendError)(res, error);
            }
        },
        loginHandler: async (req, res) => {
            try {
                const input = parseAuthInput(req.body);
                const user = await (0, loginUser_1.loginUser)(userRepository, input);
                res.json(formatAuthResponse(user));
            }
            catch (error) {
                (0, http_1.sendError)(res, error);
            }
        },
    };
}
function parseAuthInput(body) {
    if (!body || typeof body !== "object") {
        throw new http_1.DomainError("Request body must be an object");
    }
    const data = body;
    const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
    const password = typeof data.password === "string" ? data.password : "";
    if (!email) {
        throw new http_1.DomainError("Email is required");
    }
    if (!password) {
        throw new http_1.DomainError("Password is required");
    }
    return { email, password };
}
