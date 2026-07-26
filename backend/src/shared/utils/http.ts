import { Response } from "express";

export function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 100);
}

export function sendError(res: Response, error: unknown): void {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(500).json({ error: "Unexpected error" });
}
