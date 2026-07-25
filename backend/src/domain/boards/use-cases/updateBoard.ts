import { Board, UpdateBoardInput } from "../entities/board";
import { BoardRepository } from "../repositories/boardRepository";

export async function updateBoard(
  boardRepository: BoardRepository,
  id: string,
  input: UpdateBoardInput,
): Promise<Board | null> {
  if (input.title !== undefined && !input.title.trim()) {
    throw new Error("Title cannot be empty");
  }

  return boardRepository.update(id, input);
}
