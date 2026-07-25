"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoard = createBoard;
async function createBoard(boardRepository, input) {
    if (!input.title.trim()) {
        throw new Error("Title is required");
    }
    return boardRepository.create(input);
}
