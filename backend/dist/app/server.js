"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
function createApp() {
    const app = (0, express_1.default)();
    app.disable("x-powered-by");
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
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
