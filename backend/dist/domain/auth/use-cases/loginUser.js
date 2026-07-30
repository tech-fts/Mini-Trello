"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
const authValidators_1 = require("./authValidators");
const password_1 = require("../../../shared/utils/password");
const http_1 = require("../../../shared/utils/http");
async function loginUser(userRepository, input) {
    (0, authValidators_1.validateLoginInput)(input);
    const existingUser = await userRepository.getByEmail(input.email);
    if (!existingUser) {
        throw new http_1.DomainError("Invalid credentials", 401);
    }
    const isValid = (0, password_1.verifyPassword)(input.password, existingUser.passwordHash);
    if (!isValid) {
        throw new http_1.DomainError("Invalid credentials", 401);
    }
    return existingUser;
}
