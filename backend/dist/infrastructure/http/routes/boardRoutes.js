"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoardRouter = createBoardRouter;
const express_1 = require("express");
const boardController_1 = require("../controllers/boardController");
const boardRepository_1 = require("../../persistence/postgres/boardRepository");
function createBoardRouter(boardRepository = new boardRepository_1.PrismaBoardRepository()) {
    const router = (0, express_1.Router)();
    const controller = (0, boardController_1.createBoardController)(boardRepository);
    router.get("/", controller.listBoards);
    router.post("/", controller.createBoardHandler);
    router.get("/:id", controller.getBoard);
    router.put("/:id", controller.updateBoardHandler);
    router.delete("/:id", controller.deleteBoardHandler);
    return router;
}
