import { Express, Request, Response } from "express";
import { createBoardRouter } from "../infrastructure/http/routes/boardRoutes";
import { createCardRouter } from "../infrastructure/http/routes/cardRoutes";
import { createAuthRouter } from "../infrastructure/http/routes/authRoutes";

export function registerRoutes(app: Express): void {
  app.get("/", healthCheckHandler);
  app.use("/boards", createBoardRouter());
  app.use("/cards", createCardRouter());
  app.use("/auth", createAuthRouter());
}

function healthCheckHandler(req: Request, res: Response): void {
  res.json({ status: "ok", message: "Mini Trello Backend is running" });
}
