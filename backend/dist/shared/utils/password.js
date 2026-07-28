"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const crypto_1 = require("crypto");
const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";
function hashPassword(password) {
    const salt = (0, crypto_1.randomBytes)(16).toString("hex");
    const derivedKey = (0, crypto_1.pbkdf2Sync)(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");
    return `${salt}:${derivedKey}`;
}
function verifyPassword(password, storedHash) {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) {
        return false;
    }
    const derivedKey = (0, crypto_1.pbkdf2Sync)(password, salt, ITERATIONS, KEY_LENGTH, DIGEST);
    const storedKey = Buffer.from(key, "hex");
    return (0, crypto_1.timingSafeEqual)(storedKey, derivedKey);
}
