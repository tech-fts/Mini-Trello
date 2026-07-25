import { Router } from "express";
import { createBoardController } from "../controllers/boardController";
import { PrismaBoardRepository } from "../../persistence/postgres/boardRepository";
import { BoardRepository } from "../../../domain/boards/repositories/boardRepository";

export function createBoardRouter(boardRepository: BoardRepository = new PrismaBoardRepository()) {
  const router = Router();
  const controller = createBoardController(boardRepository);

  router.get("/", controller.listBoards);
  router.post("/", controller.createBoardHandler);
  router.get("/:id", controller.getBoard);
  router.put("/:id", controller.updateBoardHandler);
  router.delete("/:id", controller.deleteBoardHandler);

  return router;
}
