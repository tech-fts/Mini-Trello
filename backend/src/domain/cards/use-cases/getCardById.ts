import { Card } from "../entities/card";
import { CardRepository } from "../repositories/cardRepository";

export async function getCardById(
  cardRepository: CardRepository,
  id: string,
): Promise<Card | null> {
  return cardRepository.getById(id);
}
