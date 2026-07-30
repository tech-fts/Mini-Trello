import { Card, CreateCardInput } from "../entities/card";
import { CardRepository } from "../repositories/cardRepository";

/**
 * Create a new card.
 *
 * DRY: Validation is handled by the controller.
 *      The use-case trusts its input and focuses on orchestration.
 * SRP: This function only knows how to persist a card.
 */
export async function createCard(
  cardRepository: CardRepository,
  input: CreateCardInput,
): Promise<Card> {
  return cardRepository.create(input);
}
