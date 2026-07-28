import { Request, Response } from "express";
import { UserRepository } from "../../../domain/auth/repositories/userRepository";
import { registerUser } from "../../../domain/auth/use-cases/registerUser";
import { loginUser } from "../../../domain/auth/use-cases/loginUser";
import { LoginUserInput, RegisterUserInput, User } from "../../../domain/auth/entities/user";
import { sendError } from "../../../shared/utils/http";

/**
 * Formats a domain User into the AuthResponse shape the frontend expects.
 *
 * DRY: single place — both registerHandler and loginHandler use this.
 */
function formatAuthResponse(user: User): { user: { id: string; email: string } } {
  return { user: { id: user.id, email: user.email } };
}

export function createAuthController(userRepository: UserRepository) {
  return {
    registerHandler: async (req: Request, res: Response): Promise<void> => {
      try {
        const input = parseAuthInput(req.body);
        const user = await registerUser(userRepository, input);
        res.status(201).json(formatAuthResponse(user));
      } catch (error) {
        sendError(res, error);
      }
    },

    loginHandler: async (req: Request, res: Response): Promise<void> => {
      try {
        const input = parseAuthInput(req.body);
        const user = await loginUser(userRepository, input);
        res.json(formatAuthResponse(user));
      } catch (error) {
        sendError(res, error);
      }
    },
  };
}

/**
 * Parses and normalizes auth request bodies.
 *
 * SRP: this function owns input parsing/sanitization for auth endpoints.
 * The domain use-cases receive already-normalized input and don't re-normalize.
 */
function parseAuthInput(body: unknown): RegisterUserInput & LoginUserInput {
  if (!body || typeof body !== "object") {
    throw new Error("Request body must be an object");
  }

  const data = body as Record<string, unknown>;
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const password = typeof data.password === "string" ? data.password : "";

  if (!email) {
    throw new Error("Email is required");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  return { email, password };
}
