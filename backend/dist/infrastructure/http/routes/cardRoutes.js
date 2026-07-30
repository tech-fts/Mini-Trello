"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCardRouter = createCardRouter;
const express_1 = require("express");
const cardController_1 = require("../controllers/cardController");
const repositoryFactory_1 = require("../../persistence/repositoryFactory");
function createCardRouter() {
    const router = (0, express_1.Router)();
    const repository = (0, repositoryFactory_1.getCardRepository)();
    const controller = (0, cardController_1.createCardController)(repository);
    router.get("/", controller.listCards);
    router.post("/", controller.createCardHandler);
    router.get("/:id", controller.getCard);
    router.put("/:id", controller.updateCardHandler);
    router.delete("/:id", controller.deleteCardHandler);
    router.put("/:id/position", controller.updateCardPositionHandler);
    return router;
}
