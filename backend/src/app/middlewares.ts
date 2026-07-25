import { NextFunction, Request, Response } from "express";

export function handleNotFound(req: Request, res: Response): void {
  res.status(404).json({ error: "Not Found" });
}

export function handleError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
}
