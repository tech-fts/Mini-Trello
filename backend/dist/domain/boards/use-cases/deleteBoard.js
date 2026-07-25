"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = deleteBoard;
async function deleteBoard(boardRepository, id) {
    return boardRepository.delete(id);
}
