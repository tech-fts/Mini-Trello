import { Router } from "express";
import { createCardController } from "../controllers/cardController";
import { InMemoryCardRepository } from "../../persistence/inMemory/cardRepository";
import { CardRepository } from "../../../domain/cards/repositories/cardRepository";

export function createCardRouter(cardRepository: CardRepository = new InMemoryCardRepository()) {
  const router = Router();
  const controller = createCardController(cardRepository);

  router.get("/:id", controller.getCard);
  router.put("/:id/position", controller.updateCardPositionHandler);

  return router;
}
