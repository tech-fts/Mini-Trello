import { Express, Request, Response } from "express";
import { createBoardRouter } from "../infrastructure/http/routes/boardRoutes";

export function registerRoutes(app: Express): void {
  app.get("/", healthCheckHandler);
  app.use("/boards", createBoardRouter());
}

function healthCheckHandler(req: Request, res: Response): void {
  res.json({ status: "ok", message: "Mini Trello Backend is running" });
}
