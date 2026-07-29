import { Router } from "express";
import { createAuthController } from "../controllers/authController";
import { getUserRepository } from "../../persistence/repositoryFactory";

export function createAuthRouter() {
  const router = Router();
  const repository = getUserRepository();
  const controller = createAuthController(repository);

  router.post("/register", controller.registerHandler);
  router.post("/login", controller.loginHandler);

  return router;
}
