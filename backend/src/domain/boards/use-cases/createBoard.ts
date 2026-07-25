import { Board, CreateBoardInput } from "../entities/board";
import { BoardRepository } from "../repositories/boardRepository";

export async function createBoard(
  boardRepository: BoardRepository,
  input: CreateBoardInput,
): Promise<Board> {
  if (!input.title.trim()) {
    throw new Error("Title is required");
  }

  return boardRepository.create(input);
}
