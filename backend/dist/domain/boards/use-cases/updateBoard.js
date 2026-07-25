"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBoard = updateBoard;
async function updateBoard(boardRepository, id, input) {
    if (input.title !== undefined && !input.title.trim()) {
        throw new Error("Title cannot be empty");
    }
    return boardRepository.update(id, input);
}
