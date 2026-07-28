"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const crypto_1 = require("crypto");
class InMemoryUserRepository {
    constructor() {
        this.users = [];
    }
    async getByEmail(email) {
        const normalizedEmail = email.trim().toLowerCase();
        return this.users.find((user) => user.email === normalizedEmail) ?? null;
    }
    async create(input, passwordHash) {
        const user = {
            id: (0, crypto_1.randomUUID)(),
            email: input.email.trim().toLowerCase(),
            passwordHash,
            createdAt: new Date().toISOString(),
        };
        this.users.push(user);
        return user;
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
