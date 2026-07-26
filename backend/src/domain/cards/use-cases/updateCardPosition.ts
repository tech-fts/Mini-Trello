import { Card } from "../entities/card";
import { CardRepository } from "../repositories/cardRepository";
import { validateCardPositionInput } from "./validateCardPosition";
import { UpdateCardPositionInput } from "../entities/card";

export async function updateCardPosition(
  cardRepository: CardRepository,
  cardId: string,
  input: UpdateCardPositionInput,
): Promise<Card | null> {
  validateCardPositionInput(input);

  const existingCard = await cardRepository.getById(cardId);
  if (!existingCard) {
    return null;
  }

  if (input.columnId === undefined) {
    input = { ...input, columnId: existingCard.columnId };
  }

  return cardRepository.updatePosition(cardId, input);
}
