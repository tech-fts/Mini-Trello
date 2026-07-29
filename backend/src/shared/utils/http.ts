import { Response } from "express";

/**
 * Sanitize a route parameter ID — strip non-alphanumeric chars,
 * limit to 100 chars max.
 */
export function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 100);
}

/**
 * Send a structured error response.
 *
 * SOLID: SRP — this function only knows how to build error responses.
 * Security: Domain errors (validation, not-found) go to the client.
 *           Infrastructure errors (DB connection, Prisma) are masked
 *           and only logged server-side.
 */
export function sendError(res: Response, error: unknown): void {
  if (error instanceof DomainError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  // Infrastructure / unexpected — log the real error, return a safe message.
  console.error("[infra-error]", error);
  res.status(500).json({ error: "Internal server error" });
}

/**
 * Tagged error class for domain-level failures that are safe to
 * expose to API consumers (validation, not-found, conflict, etc.).
 */
export class DomainError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "DomainError";
    this.statusCode = statusCode;
  }
}
