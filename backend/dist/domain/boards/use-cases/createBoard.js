"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBoard = createBoard;
/**
 * Create a new board.
 *
 * DRY: Validation is handled by the controller (parseCreateBoardInput).
 *      The use-case trusts its input and focuses on orchestration.
 * SRP: This function only knows how to persist a board.
 */
async function createBoard(boardRepository, input) {
    return boardRepository.create(input);
}
