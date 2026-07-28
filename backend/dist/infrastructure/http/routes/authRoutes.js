"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = createAuthRouter;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const userRepository_1 = require("../../persistence/inMemory/userRepository");
function createAuthRouter(userRepository = new userRepository_1.InMemoryUserRepository()) {
    const router = (0, express_1.Router)();
    const controller = (0, authController_1.createAuthController)(userRepository);
    router.post("/register", controller.registerHandler);
    router.post("/login", controller.loginHandler);
    return router;
}
