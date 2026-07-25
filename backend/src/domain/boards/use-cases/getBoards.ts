import { Board } from "../entities/board";
import { BoardRepository } from "../repositories/boardRepository";

export async function getBoards(boardRepository: BoardRepository): Promise<Board[]> {
  return boardRepository.list();
}
