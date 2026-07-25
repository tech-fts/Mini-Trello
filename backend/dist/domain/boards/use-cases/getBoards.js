"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoards = getBoards;
async function getBoards(boardRepository) {
    return boardRepository.list();
}
