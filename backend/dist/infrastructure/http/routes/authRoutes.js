"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = createAuthRouter;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const repositoryFactory_1 = require("../../persistence/repositoryFactory");
function createAuthRouter() {
    const router = (0, express_1.Router)();
    const repository = (0, repositoryFactory_1.getUserRepository)();
    const controller = (0, authController_1.createAuthController)(repository);
    router.post("/register", controller.registerHandler);
    router.post("/login", controller.loginHandler);
    return router;
}
