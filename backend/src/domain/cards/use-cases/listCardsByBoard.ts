import { Card } from "../entities/card";
import { CardRepository } from "../repositories/cardRepository";

export async function listCardsByBoard(
  cardRepository: CardRepository,
  boardId: string,
): Promise<Card[]> {
  return cardRepository.listByBoard(boardId);
}
