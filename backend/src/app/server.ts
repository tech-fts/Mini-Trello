import "dotenv/config";
import http from "http";
import express, { Express } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { handleError, handleNotFound } from "./middlewares";
import { createSocketServer } from "../infrastructure/websocket/socketServer";

export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    next();
  });

  registerRoutes(app);
  app.use(handleNotFound);
  app.use(handleError);
  return app;
}

const port = Number(process.env.PORT) || 4000;
const app = createApp();

// Socket.IO needs the raw http.Server for WebSocket upgrade handling.
const httpServer = http.createServer(app);
createSocketServer(httpServer);

httpServer.listen(port, () => {
  console.log(`Server running on port ${port} (HTTP + WebSocket)`);
});
