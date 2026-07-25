import { Board } from "../entities/board";
import { BoardRepository } from "../repositories/boardRepository";

export async function getBoardById(
  boardRepository: BoardRepository,
  id: string,
): Promise<Board | null> {
  return boardRepository.getById(id);
}
