import { Request, Response } from "express";
import { UserRepository } from "../../../domain/auth/repositories/userRepository";
import { registerUser } from "../../../domain/auth/use-cases/registerUser";
import { loginUser } from "../../../domain/auth/use-cases/loginUser";
import { LoginUserInput, RegisterUserInput } from "../../../domain/auth/entities/user";
import { sendError } from "../../../shared/utils/http";

export function createAuthController(userRepository: UserRepository) {
  return {
    registerHandler: async (req: Request, res: Response): Promise<void> => {
      try {
        const input = parseAuthInput(req.body);
        const user = await registerUser(userRepository, input);
        res.status(201).json({ id: user.id, email: user.email, createdAt: user.createdAt });
      } catch (error) {
        sendError(res, error);
      }
    },

    loginHandler: async (req: Request, res: Response): Promise<void> => {
      try {
        const input = parseAuthInput(req.body);
        const user = await loginUser(userRepository, input);
        res.json({ id: user.id, email: user.email, createdAt: user.createdAt });
      } catch (error) {
        sendError(res, error);
      }
    },
  };
}

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
