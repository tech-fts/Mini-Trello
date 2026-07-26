import { Card, UpdateCardPositionInput } from "../../../domain/cards/entities/card";
import { CardRepository } from "../../../domain/cards/repositories/cardRepository";

export class InMemoryCardRepository implements CardRepository {
  private cards: Card[] = [];

  seed(cards: Card[]): void {
    this.cards = [...cards];
  }

  async getById(id: string): Promise<Card | null> {
    return this.cards.find((card) => card.id === id) ?? null;
  }

  async listByBoard(boardId: string): Promise<Card[]> {
    return this.cards
      .filter((card) => card.boardId === boardId)
      .sort((a, b) => a.position - b.position);
  }

  async updatePosition(
    id: string,
    input: UpdateCardPositionInput,
  ): Promise<Card | null> {
    const index = this.cards.findIndex((card) => card.id === id);
    if (index === -1) {
      return null;
    }

    const existingCard = this.cards[index];
    const updatedCard: Card = {
      ...existingCard,
      position: input.position,
      columnId: input.columnId ?? existingCard.columnId,
    };

    this.cards[index] = updatedCard;
    return updatedCard;
  }
}
