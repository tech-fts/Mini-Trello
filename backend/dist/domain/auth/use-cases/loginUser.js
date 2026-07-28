"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
const authValidators_1 = require("./authValidators");
const password_1 = require("../../../shared/utils/password");
async function loginUser(userRepository, input) {
    (0, authValidators_1.validateLoginInput)(input);
    const existingUser = await userRepository.getByEmail(input.email);
    if (!existingUser) {
        throw new Error("Invalid credentials");
    }
    const isValid = (0, password_1.verifyPassword)(input.password, existingUser.passwordHash);
    if (!isValid) {
        throw new Error("Invalid credentials");
    }
    return existingUser;
}
