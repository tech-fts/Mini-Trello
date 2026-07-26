import { Card, UpdateCardPositionInput } from "../entities/card";

export interface CardRepository {
  getById(id: string): Promise<Card | null>;
  listByBoard(boardId: string): Promise<Card[]>;
  updatePosition(id: string, input: UpdateCardPositionInput): Promise<Card | null>;
}
