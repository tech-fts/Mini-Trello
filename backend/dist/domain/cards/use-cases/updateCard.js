"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCard = updateCard;
async function updateCard(cardRepository, id, input) {
    return cardRepository.update(id, input);
}
