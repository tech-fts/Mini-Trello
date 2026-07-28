"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCardPosition = updateCardPosition;
const validateCardPosition_1 = require("./validateCardPosition");
async function updateCardPosition(cardRepository, cardId, input) {
    (0, validateCardPosition_1.validateCardPositionInput)(input);
    const existingCard = await cardRepository.getById(cardId);
    if (!existingCard) {
        return null;
    }
    if (input.columnId === undefined) {
        input = { ...input, columnId: existingCard.columnId };
    }
    return cardRepository.updatePosition(cardId, input);
}
