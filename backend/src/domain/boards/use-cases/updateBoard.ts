import { Board, UpdateBoardInput } from "../entities/board";
import { BoardRepository } from "../repositories/boardRepository";
import { DomainError } from "../../../shared/utils/http";

export async function updateBoard(
  boardRepository: BoardRepository,
  id: string,
  input: UpdateBoardInput,
): Promise<Board | null> {
  if (input.title !== undefined && !input.title.trim()) {
    throw new DomainError("Title cannot be empty");
  }

  return boardRepository.update(id, input);
}
