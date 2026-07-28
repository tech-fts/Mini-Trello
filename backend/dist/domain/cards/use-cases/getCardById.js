"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardById = getCardById;
async function getCardById(cardRepository, id) {
    return cardRepository.getById(id);
}
