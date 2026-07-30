"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const socketServer_1 = require("../infrastructure/websocket/socketServer");
function createApp() {
    const app = (0, express_1.default)();
    app.disable("x-powered-by");
    app.use((0, cors_1.default)({ origin: true, credentials: true }));
    app.use(express_1.default.json({ limit: "1mb" }));
    app.use((req, res, next) => {
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("Referrer-Policy", "no-referrer");
        next();
    });
    (0, routes_1.registerRoutes)(app);
    app.use(middlewares_1.handleNotFound);
    app.use(middlewares_1.handleError);
    return app;
}
const port = Number(process.env.PORT) || 4000;
const app = createApp();
// Socket.IO needs the raw http.Server for WebSocket upgrade handling.
const httpServer = http_1.default.createServer(app);
(0, socketServer_1.createSocketServer)(httpServer);
httpServer.listen(port, () => {
    console.log(`Server running on port ${port} (HTTP + WebSocket)`);
});
