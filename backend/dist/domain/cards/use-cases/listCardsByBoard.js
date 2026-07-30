"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCardsByBoard = listCardsByBoard;
async function listCardsByBoard(cardRepository, boardId) {
    return cardRepository.listByBoard(boardId);
}
