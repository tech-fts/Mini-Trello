import { Router } from "express";
import { createBoardController } from "../controllers/boardController";
import { getBoardRepository } from "../../persistence/repositoryFactory";

export function createBoardRouter() {
  const router = Router();
  const repository = getBoardRepository();
  const controller = createBoardController(repository);

  router.get("/", controller.listBoards);
  router.post("/", controller.createBoardHandler);
  router.get("/:id", controller.getBoard);
  router.put("/:id", controller.updateBoardHandler);
  router.delete("/:id", controller.deleteBoardHandler);

  return router;
}
