"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = deleteCard;
async function deleteCard(cardRepository, id) {
    return cardRepository.delete(id);
}
