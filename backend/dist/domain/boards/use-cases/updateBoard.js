"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBoard = updateBoard;
const http_1 = require("../../../shared/utils/http");
async function updateBoard(boardRepository, id, input) {
    if (input.title !== undefined && !input.title.trim()) {
        throw new http_1.DomainError("Title cannot be empty");
    }
    return boardRepository.update(id, input);
}
