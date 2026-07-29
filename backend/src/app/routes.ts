import { Express, Request, Response } from "express";
import { createBoardRouter } from "../infrastructure/http/routes/boardRoutes";
import { createCardRouter } from "../infrastructure/http/routes/cardRoutes";
import { createAuthRouter } from "../infrastructure/http/routes/authRoutes";

export function registerRoutes(app: Express): void {
  app.get("/", healthCheckHandler);
  app.use("/api/boards", createBoardRouter());
  app.use("/api/cards", createCardRouter());
  app.use("/api/auth", createAuthRouter());
}

function healthCheckHandler(req: Request, res: Response): void {
  res.json({ status: "ok", message: "Mini Trello Backend is running" });
}
