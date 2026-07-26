import { Router } from "express";
import { createAuthController } from "../controllers/authController";
import { InMemoryUserRepository } from "../../persistence/inMemory/userRepository";
import { UserRepository } from "../../../domain/auth/repositories/userRepository";

export function createAuthRouter(userRepository: UserRepository = new InMemoryUserRepository()) {
  const router = Router();
  const controller = createAuthController(userRepository);

  router.post("/register", controller.registerHandler);
  router.post("/login", controller.loginHandler);

  return router;
}
