"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCardRouter = createCardRouter;
const express_1 = require("express");
const cardController_1 = require("../controllers/cardController");
const cardRepository_1 = require("../../persistence/inMemory/cardRepository");
function createCardRouter(cardRepository = new cardRepository_1.InMemoryCardRepository()) {
    const router = (0, express_1.Router)();
    const controller = (0, cardController_1.createCardController)(cardRepository);
    router.get("/:id", controller.getCard);
    router.put("/:id/position", controller.updateCardPositionHandler);
    return router;
}
