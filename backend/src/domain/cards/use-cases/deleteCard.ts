import { CardRepository } from "../repositories/cardRepository";

export async function deleteCard(
  cardRepository: CardRepository,
  id: string,
): Promise<boolean> {
  return cardRepository.delete(id);
}
