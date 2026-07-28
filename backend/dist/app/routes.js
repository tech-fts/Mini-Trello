"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const boardRoutes_1 = require("../infrastructure/http/routes/boardRoutes");
const cardRoutes_1 = require("../infrastructure/http/routes/cardRoutes");
const authRoutes_1 = require("../infrastructure/http/routes/authRoutes");
function registerRoutes(app) {
    app.get("/", healthCheckHandler);
    app.use("/boards", (0, boardRoutes_1.createBoardRouter)());
    app.use("/cards", (0, cardRoutes_1.createCardRouter)());
    app.use("/auth", (0, authRoutes_1.createAuthRouter)());
}
function healthCheckHandler(req, res) {
    res.json({ status: "ok", message: "Mini Trello Backend is running" });
}
