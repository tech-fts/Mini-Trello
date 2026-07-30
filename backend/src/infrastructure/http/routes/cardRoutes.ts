import { Router } from "express";
import { createCardController } from "../controllers/cardController";
import { getCardRepository } from "../../persistence/repositoryFactory";

export function createCardRouter() {
  const router = Router();
  const repository = getCardRepository();
  const controller = createCardController(repository);

  router.get("/", controller.listCards);
  router.post("/", controller.createCardHandler);
  router.get("/:id", controller.getCard);
  router.put("/:id", controller.updateCardHandler);
  router.delete("/:id", controller.deleteCardHandler);
  router.put("/:id/position", controller.updateCardPositionHandler);

  return router;
}
