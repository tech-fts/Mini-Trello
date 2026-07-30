import { Card } from "../entities/card";
import { CardRepository } from "../repositories/cardRepository";

export async function updateCard(
  cardRepository: CardRepository,
  id: string,
  input: { title?: string; description?: string },
): Promise<Card | null> {
  return cardRepository.update(id, input);
}
