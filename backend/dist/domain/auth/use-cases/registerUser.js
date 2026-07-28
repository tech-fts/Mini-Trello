"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
const authValidators_1 = require("./authValidators");
const password_1 = require("../../../shared/utils/password");
async function registerUser(userRepository, input) {
    (0, authValidators_1.validateRegisterInput)(input);
    const existingUser = await userRepository.getByEmail(input.email);
    if (existingUser) {
        throw new Error("Email is already registered");
    }
    const passwordHash = (0, password_1.hashPassword)(input.password);
    return userRepository.create(input, passwordHash);
}
