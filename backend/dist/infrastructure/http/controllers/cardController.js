"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCardController = createCardController;
const updateCardPosition_1 = require("../../../domain/cards/use-cases/updateCardPosition");
const getCardById_1 = require("../../../domain/cards/use-cases/getCardById");
const http_1 = require("../../../shared/utils/http");
function createCardController(cardRepository) {
    return {
        getCard: async (req, res) => {
            try {
                const cardId = (0, http_1.sanitizeId)(req.params.id);
                const card = await (0, getCardById_1.getCardById)(cardRepository, cardId);
                if (!card) {
                    res.status(404).json({ error: "Card not found" });
                    return;
                }
                res.json(card);
            }
            catch (error) {
                (0, http_1.sendError)(res, error);
            }
        },
        updateCardPositionHandler: async (req, res) => {
            try {
                const cardId = (0, http_1.sanitizeId)(req.params.id);
                const input = parseUpdateCardPositionInput(req.body);
                const card = await (0, updateCardPosition_1.updateCardPosition)(cardRepository, cardId, input);
                if (!card) {
                    res.status(404).json({ error: "Card not found" });
                    return;
                }
                res.json(card);
            }
            catch (error) {
                (0, http_1.sendError)(res, error);
            }
        },
    };
}
function parseUpdateCardPositionInput(body) {
    if (!body || typeof body !== "object") {
        throw new Error("Request body must be an object");
    }
    const data = body;
    const position = typeof data.position === "number" ? data.position : NaN;
    const columnId = typeof data.columnId === "string" ? data.columnId.trim() : undefined;
    if (!Number.isFinite(position)) {
        throw new Error("Position must be a number");
    }
    if (position < 0) {
        throw new Error("Position must be a non-negative number");
    }
    return { position, columnId };
}
