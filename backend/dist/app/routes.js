"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const boardRoutes_1 = require("../infrastructure/http/routes/boardRoutes");
function registerRoutes(app) {
    app.get("/", healthCheckHandler);
    app.use("/boards", (0, boardRoutes_1.createBoardRouter)());
}
function healthCheckHandler(req, res) {
    res.json({ status: "ok", message: "Mini Trello Backend is running" });
}
