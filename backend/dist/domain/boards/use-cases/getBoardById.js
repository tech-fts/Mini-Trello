"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoardById = getBoardById;
async function getBoardById(boardRepository, id) {
    return boardRepository.getById(id);
}
