"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoardRouter = createBoardRouter;
const express_1 = require("express");
const boardController_1 = require("../controllers/boardController");
const repositoryFactory_1 = require("../../persistence/repositoryFactory");
function createBoardRouter() {
    const router = (0, express_1.Router)();
    const repository = (0, repositoryFactory_1.getBoardRepository)();
    const controller = (0, boardController_1.createBoardController)(repository);
    router.get("/", controller.listBoards);
    router.post("/", controller.createBoardHandler);
    router.get("/:id", controller.getBoard);
    router.put("/:id", controller.updateBoardHandler);
    router.delete("/:id", controller.deleteBoardHandler);
    return router;
}
