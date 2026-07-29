import { Board, CreateBoardInput } from "../entities/board";
import { BoardRepository } from "../repositories/boardRepository";

/**
 * Create a new board.
 *
 * DRY: Validation is handled by the controller (parseCreateBoardInput).
 *      The use-case trusts its input and focuses on orchestration.
 * SRP: This function only knows how to persist a board.
 */
export async function createBoard(
  boardRepository: BoardRepository,
  input: CreateBoardInput,
): Promise<Board> {
  return boardRepository.create(input);
}
