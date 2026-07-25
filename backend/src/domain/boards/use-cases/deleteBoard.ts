import { BoardRepository } from "../repositories/boardRepository";

export async function deleteBoard(boardRepository: BoardRepository, id: string): Promise<boolean> {
  return boardRepository.delete(id);
}
